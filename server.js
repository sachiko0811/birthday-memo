// console.log('server.js yeah')

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.listen(5000,function() {
    console.log('listen on 3000')
})

const connectionString = `${process.env.DB_URL}`

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
.then(client => {
    console.log('Connected to DB')
    const db = client.db('bdaymemo')
    const memosCollection = db.collection('memos')

    // ========================
    // Middlewares
    // ========================
    // Place body-parser before CRUD handlers
    app.set('view engine', 'ejs') // -> can generate HTML containig the memos(rendering the HTML)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))


// READ
// app.get(endpoint, callback)
app.get('/', (req, res) => {
    // res.send('Hi')
    // res.sendFile(__dirname + '/index.html')
    // const cursor = db.collection('memos').find().toArray()
    memosCollection.find().toArray()
    // find() -> get memos stored iin MongoDB
    // toArray() -> to convert the data into an array
    .then(results => {
        // console.log(results)
        res.render('index.ejs',{ memos: results })
        // render() -> built into Express's response, res.render(view, locals)
        // ejs -> can't convert obj into HTML automatically
    })
    .catch(error => console.error(error))
    // console.log(cursor)    
})

// CREATE
app.post('/memos', (req, res) => {
    // console.log("Thank you for letting me know your bday!")
    // console.log(req.body)
    memosCollection.insertOne(req.body)
    .then(result => {
        console.log(result)
        res.redirect('/') // no need to send the browser info because the browser expects sth back from the server
    })
    .catch(error => console.error(error))
})

// UPDATE
app.put('/memos', (req, res) => {
    // console.log(req.body)
    memosCollection.findOneAndUpdate(
        { name: req.body.name },
        {
            $set: {
                bday: req.body.bday,
                name: req.body.name
            }
        },
        {
            upsert: true
        }
    
    )
    .then(result => {
        // console.log(result)
        res.json('success')
    })
    
    .catch(error => console.error(error))
    
})

// Delete
app.delete('/memos', (req, res) => {
    memosCollection.deleteOne(
        { name: req.body.name },
    )
    .then(result => {
        if(result.deletedCount === 0) {
            return res.json('No memo to delete')
        }
        res.json(`Deleted`)
    })
    .catch(error => console.error(error))
})
    
})
.catch(error => console.error(error))

