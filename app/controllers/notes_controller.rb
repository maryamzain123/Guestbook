class NotesController < ApplicationController

    def index

        notes = Note.all
        render json: notes.to_json(:include => :comments)
    end

    def show
    end

    def update
       
        note = Note.find(params[:id])
        
        if note.update(note_params)
            render json: note.to_json(:include => :comments)
        else
            render json: {error: "There was an error"}
        end
    end

    def create
       
    note = Note.new(note_params)
        
    if note.save
        render json: note.to_json(:include => :comments)
    else
        render json: {error: "There was an error"}
    end
end



def destroy 
    note = Note.find(params[:id])
    note.destroy
    render json: Note.all.to_json(:include => :comments)
end 



    private

    def note_params
        params.require(:note).permit(:name, :content, :likes)
    end


end
