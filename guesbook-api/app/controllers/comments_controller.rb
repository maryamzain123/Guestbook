class CommentsController < ApplicationController


    def create
        comment = Comment.new(comment_params)
        if comment.save
            render json: comment.note.comments
        else    
            
        end 
    end 

    

    def update
        # binding.pry
        comment = Comment.find(params[:id])
        if comment.update(comment_params)
            render json: comment.note.comments
        else

        end 
    end 

    


private 

def comment_params

    params.require(:comment).permit(:content, :likes, :note_id)
end 

end