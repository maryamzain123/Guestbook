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






    private

    def note_params
        params.require(:note).permit(:name, :content, :likes)
    end


end
