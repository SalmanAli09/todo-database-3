var list = document.getElementById('list')


firebase.database().ref('todos').on('child_added' , function(data){
    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)


    // // DELETE BUTTON
    var delbtn = document.createElement("button")
    var deltext = document.createTextNode("DELETE")
    delbtn.setAttribute('class' , 'btn2')
    delbtn.setAttribute('id', data.val().key)
    delbtn.setAttribute('onclick' , 'deleteitem(this)')
    delbtn.appendChild(deltext)

    // // EDIT BUTTON

    var editbtn = document.createElement("button")
    var editText = document.createTextNode("Edit")
    editbtn.appendChild(editText)
    editbtn.setAttribute('class' , 'btn3')
    editbtn.setAttribute('id', data.val().key)

    editbtn.setAttribute('onclick' , 'edititem(this)')

    li.appendChild(delbtn)
    li.appendChild(editbtn)


    list.appendChild(li)
    li.appendChild(liText)
})





function func1(){

    // INPUT BUTTON
    var inputItem = document.getElementById('addtext');

    var key = firebase.database().ref('todos').push().key

    var todo = {
        value: inputItem.value,
        key: key
    }

    firebase.database().ref('todos').child(key).set(todo)
      addtext.value = ''
}

function deleteitem(e){
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function edititem(e){
    var val =  prompt ('Enter Edit Value',  e.parentNode.childNodes[2].nodeValue)
    var editTodo = {
         value: val,
         key: e.id

    }

    firebase.database().ref('todos').child(e.id).set(editTodo)

    e.parentNode.childNodes[2].nodeValue = editvalue      
  }

function delall(){
    firebase.database().ref('todos').remove()
  list.innerHTML = ""
}

