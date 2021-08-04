class Note {
    static all = []

    constructor(id, name, content, likes, comments){
        this.id = id
        this.name = name
        this.content = content
        this.likes = likes
        this.comments = [...comments]
    }

    save(){
        Note.all.push(this)
    }

    static fetchNotes(){
        fetch("http://localhost:3000/notes")
        .then(resp => resp.json())
        .then(json => {
            Note.renderNotes(json)
            
        })
    }

    static createNote(e){
        
        e.preventDefault();
        let name = e.target.children[0].value
        let content = e.target.children[2].value


        let params = {
           note: {
               name: name,
                content: content
           }
        }

        let configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }
try  {
        fetch("http://localhost:3000/notes", configObj)
        .then(resp => resp.json())
        .then(() => {
            e.target.children[0].value = ""
            e.target.children[2].value = ""
            fetch("http://localhost:3000/notes")
            .then(resp => resp.json())
            .then(json => {
                Note.renderNotes(json)
            })
        })
    }
    catch {
        
    }
    }

    static createComment(e){
        e.preventDefault();

        let params = {
           comment: {
               content: e.target.children[0].value,
               note_id: this.id
           }
        }
        let configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }
        // debugger
        fetch(`http://localhost:3000/notes/${this.id}/comments`, configObj)
        .then(resp => resp.json())
        .then(comments => Note.updateComments(comments))
    }


    static renderNotes(notesInfo){
        //debugger
        clearContainer(notesContainer())
        Note.all = []
        notesInfo.forEach(note => {
            let new_note = new Note(note.id, note.name, note.content, note.likes, note.comments)
        
            new_note.save();
            let div = document.createElement("div")
            let h5 = document.createElement("h5")
            let p = document.createElement("p")
            let likeButton = document.createElement("button")
            let ul = document.createElement("ul")
            let pLikes = document.createElement("p")
            let deleteButton = document.createElement('button')

            let noteComments = Comment.renderComments(note.comments)
            let form = document.createElement("form")
            let input = document.createElement("input")
            let submitComment = document.createElement("button")

            div.id = `div ${note.id}`
            div.style.padding = "20px"
            div.className = "card"
            h5.innerText = note.name
            h5.id = `name for ${note.id}`
            p.innerText = note.content
            p.id = `content for ${note.id}`
            pLikes.innerText = note.likes
            pLikes.id = `number of likes for ${note.id}`
            ul.id = `comments for ${note.id}`
            likeButton.innerText = "❣"
            likeButton.addEventListener('click', Note.likeNote.bind(note))
            deleteButton.innerText = "x"
            deleteButton.addEventListener("click", Note.deleteNote.bind(note))
            input.type = "text"
            input.placeholder = "Type comment here.."
            submitComment.type = "submit"
            submitComment.innerText = "Submit"
            form.addEventListener("submit", Note.createComment.bind(note))
            form.appendChild(input)
            form.appendChild(submitComment)
            
            
            div.appendChild(h5)
            div.appendChild(p)
            div.appendChild(pLikes)
            div.appendChild(likeButton)
            div.appendChild(deleteButton)

            noteComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)
            div.appendChild(form)


            notesContainer().appendChild(div)
        })

    }


    static deleteNote(e){
        let configObj = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }
        fetch(`http://localhost:3000/notes/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(json => Note.renderNotes(json))
    }

    static likeNote(e){
        this.likes += 1
        let params = {
            note: {
                likes: this.likes
            }
        }

        let configObj = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }

        fetch(`http://localhost:3000/notes/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(note => Note.updateNote(note))
   
    }

    static updateNote = (note) => {
        let name = document.getElementById(`name for ${note.id}`)
        let content = document.getElementById(`content for ${note.id}`)
        let likes = document.getElementById(`number of likes for ${note.id}`)
        let comments = () => document.getElementById(`comments for ${note.id}`)
        name.innerText = note.name
        content.innerText = note.content
        likes.innerText = note.likes
        let noteComments = Comment.renderComments(note.comments)
        clearContainer(comments())
        noteComments.forEach(li => comments().appendChild(li))
    }

    static updateComments = (comm) => {
        let comments = () => document.getElementById(`comments for ${comm[0].note_id}`)
        let noteComments = Comment.renderComments(comm)
        clearContainer(comments())
        noteComments.forEach(li => comments().appendChild(li))
    }


}