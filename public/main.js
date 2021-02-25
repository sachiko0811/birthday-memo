const update = document.querySelector('#update-btn')
const deleteBtn = document.querySelectorAll('.delete-btn')
const editBtn = document.querySelectorAll('.edit-btn')
const messageDiv = document.querySelector('#message')


let input;

const editInput = document.querySelector('.edit-input')
editInput.addEventListener('change', e => {
  input = e.target.value;
})

// update.addEventListener('click', e => {
//     fetch('/memos', {
//         method: 'put',
//         headers: {'Content-Type': 'application/json' },
//         // body: JSON.stringify({
//         //     bday: ,
//         //     name: 'SACHIKO'
//         // })
//     })
// })

editBtn.forEach(item => {
    item.addEventListener('click', e => {
      fetch('/memos', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.value,
          post: input
        })
      })
          .then(res => {
            if (res.ok) return res.json()
          })
          .then(response => {
            window.location.reload(true)
          })
    })
  })

// fetch({ /* request */ })
//   .then(res => {
//     if (res.ok) return res.json()
//   })
//   .then(response => {
//     console.log(response)
//   })

deleteBtn.forEach((item, index) => {
    item.addEventListener('click', e => {
      console.log(e.target.value)
      fetch('/memos', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.value
        })
      })
        .then(res => {
          if (res.ok) return res.json()
        })
        .then(response => {
          if (response === 'No post to delete') {
            messageDiv.textContent = 'No Darth Vadar post to delete'
          } else {
            window.location.reload(true)
          }
        })
        .catch(console.error)
    })
  })
  
  deleteBtn.addEventListener('click', e => {
    // console.log(e.target.value)
    fetch('/memos', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.value
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No post to delete') {
          messageDiv.textContent = 'No Darth Vadar post to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })
  