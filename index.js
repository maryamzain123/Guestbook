let notesContainer = () => document.getElementById("notes-container")
const clearContainer = (element) => {
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}


const startProgram = () => {
    Note.fetchNotes()
     

}


document.addEventListener("DOMContentLoaded", startProgram)