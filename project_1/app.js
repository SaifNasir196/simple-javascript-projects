let addBtn = document.getElementById('addBtn');
showNote()

addBtn.addEventListener('click', function(){
    let textarea = document.getElementById('addTxt')
    if (textarea.value != 0) {
    let notes = localStorage.getItem('notes')

    if (notes ==null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(textarea.value)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTxt.value = ''
    showNote()
    } 
})

function showNote(){
    let notes = localStorage.getItem('notes')

    if (notes ==null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = ''
    notesObj.forEach(function(ele, index){
        html += `
        <div class="noteCard my-3 mx-3 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index+1}</h5>
                <p class="card-text">${ele}</p>
                <button id= ${index} onclick='delNote(this.id)' class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `
    })
    let notesElem = document.getElementById('notes')
    if (notesObj.length != 0){
        notesElem.innerHTML = html
    }
    else{
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section`
    }
}
function delNote(index){
    let notes = localStorage.getItem('notes')
    if (notes ==null) {
        notesObj = []
    }      
    else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNote()
}

let search = document.getElementById('searchTxt')
search.addEventListener('input', function(){
    
    let inputVal = search.value
    // console.log(inputVal);

    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function(ele){
        let cardTxt = ele.getElementsByTagName('p')[0].innerText
        if (cardTxt.includes(inputVal)){
            ele.style.display = 'block'
        }
        else {
            ele.style.display = 'none'
        }
    })
})
