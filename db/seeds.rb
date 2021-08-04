# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies
Note.create(name: "maryam", content: "congratulations! you both look make a great couple")
Note.create(name: "sara",  content: "Cant wait for you to have babies  good wishes to both of you!")
Note.create(name: "maryam", content: "Love your whole wedding it was amazing would love to know who was your caterer")



Comment.create(content: "Thank you so much", note_id: 1)
Comment.create(content: "It was so good seeing ya'll", note_id: 2)

puts "seeded"