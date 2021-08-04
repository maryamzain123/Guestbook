class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :name
      t.integer :likes, :default => 0
      t.string :content

      t.timestamps
    end
  end
end
