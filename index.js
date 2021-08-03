let notesContainer = () => document.getElementById("notes-container")
const clearContainer = (element) => {
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}


const startProgram = () => {
    let form  = document.getElementById("form")
    form.addEventListener('submit', Note.createNote)
    Note.fetchNotes()
     

}


document.addEventListener("DOMContentLoaded", startProgram)