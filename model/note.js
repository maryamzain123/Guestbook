class Note {
    constructor(id, name, content, likes, comments){
        this.id = id
        this.name = name
        this.content = content
        this.likes = likes
        this.comments = [...comments]
    }

    static fetchNotes(){
        fetch('http://localhost:3000/notes')
        .then(resp => resp.json())
        .then(json => {
            Note.renderNotes(json)
            
        })
    }


    static renderNotes(notesInfo){
        clearContainer(notesContainer())
        notesInfo.forEach(note => {
            let div = document.createElement("div")
            let h5 = document.createElement("h5")
            let p = document.createElement("p")
            let likeButton = document.createElement("button")
            let ul = document.createElement('ul')
            let pLikes = document.createElement("p")


            let noteComments = note.comments.map(comment => {
                let li = document.createElement('li')
                let div = document.createElement('div')
                let commentContent = document.createElement('p')
                let commentLikes = document.createElement('p')
                commentContent.innerText = comment.content
                commentLikes.innerText = comment.likes
                likeButton.innerText = "❣"
                
                div.appendChild(commentContent)
                div.appendChild(commentLikes)
                div.appendChild(likeButton)
                li.appendChild(div)
                return li

            })

            div.id = `div ${note.id}`
            div.style.padding = "20px"
            div.className = "card"
            h5.innerText = note.name
            p.innerText = note.content
            pLikes.innerText = note.likes
            likeButton.innerText = "❣"
            likeButton.addEventListener('click', Note.likeNote.bind(note))

            div.appendChild(h5)
            div.appendChild(p)
            div.appendChild(pLikes)
            div.appendChild(likeButton)
            noteComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)


            notesContainer().appendChild(div)
        })

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
        .then(note => {
            debugger
            Note.updateNote(note)})
   
    }

    static updateNote = (note) => {
        let name = document.getElementById(`name for ${note.id}`)
        let content = document.getElementById(`content for ${note.id}`)
        let likes = document.getElementById(`number of likes for ${note.id}`)
        let comments = () => document.getElementById(`comments for ${note.id}`)
        name.textContent = note.title
        content.textContent = note.content
        likes.textContent = note.likes
        let noteComments = Comment.renderComments(note.comments)
        clearContainer(comments())
        noteComments.forEach(li => comments().appendChild(li))
    }

}