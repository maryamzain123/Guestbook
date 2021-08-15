class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :content
      t.integer :likes, :default => 0 
      t.integer :note_id

      t.timestamps
    end
  end
end
