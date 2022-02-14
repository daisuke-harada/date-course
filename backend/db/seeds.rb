# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: "guest", email: "guest@gmail.com", gender: '男', password: "foobar", password_confirmation: "foobar")
User.create(name: "daisuke", email: "daisuke@gmail.com", gender: '男', password: "daisuke", password_confirmation: "daisuke")
User.create(name: "kenta", email: "kenta@gmail.com", gender: '男', password: "kenta", password_confirmation: "kenta")
User.create(name: "marika", email: "marika@gmail.com", gender: '女', password: "marika", password_confirmation: "marika", admin: true)
User.create(name: "admin", email: "adminstrator@gmail.com", gender: '男', password: "adminlogin1099", password_confirmation: "adminlogin1099", admin: true)

