class Comment {

    constructor(id, content, likes, note_id){
        this.id = id
        this.content = content
        this.likes = likes
        this.note_id = note_id
    }

    static likeComment(e){
        this.likes += 1
        let params = {
            comment: {
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
        // debugger
        fetch(`http://localhost:3000/notes/${this.note_id}/comments/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(note_comments => Note.updateComments(note_comments))
    }


    static renderComments(comments){
        let noteComments = comments.map(comment => {
            let li = document.createElement('li')
            let div = document.createElement('div')
            let commentContent = document.createElement('p')
            let likeButton = document.createElement('button')
            let commentLikes = document.createElement('p')

            div.style.padding = "20px"
            
            div.style.height = "90px"
            div.className = "card"
            div.style.backgroundColor = "rgba(255, 255, 255, 0.884)"
            div.style.fontSize = "15px"
            commentContent.innerText = comment.content
            likeButton.innerText = "♥"
            likeButton.className = "likebutton"
            
            commentLikes.innerText = comment.likes
            commentLikes.className = "likes"

            likeButton.addEventListener("click", Comment.likeComment.bind(comment))
            div.appendChild(commentContent)
            div.appendChild(likeButton)
            div.appendChild(commentLikes)

            li.appendChild(div)
            return li
        })
        return noteComments
    }

}
    
