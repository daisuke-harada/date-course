User.create(name: "guest", email: "guest@gmail.com", gender: "男性", image: File.open("./public/images/user_images/man#{rand(1..3)}.jpg"), password: "foobar", password_confirmation: "foobar")
User.create(name: "daisuke", email: "daisuke@gmail.com", gender: "男性", image: File.open("./public/images/user_images/man#{rand(1..3)}.jpg"), password: "daisuke", password_confirmation: "daisuke")
User.create(name: "peter", email: "kenta@gmail.com", gender: "男性", image: File.open("./public/images/user_images/spiderman.png"), password: "foobar", password_confirmation: "foobar")
User.create(name: "marika", email: "marika@gmail.com", gender: "女性", image: File.open("./public/images/user_images/woman#{rand(1..3)}.jpg"), password: "marika", password_confirmation: "marika")
User.create(name: "nanase", email: "nanase@gmail.com", gender: "女性", image: File.open("./public/images/user_images/woman#{rand(1..3)}.jpg"), password: "nanase", password_confirmation: "nanase")
User.create(name: "kanakana", email: "kanakana@gmail.com", gender: "女性", image: File.open("./public/images/user_images/woman#{rand(1..3)}.jpg"), password: "kanakana", password_confirmation: "kanakana")

(1..12).each do |user_number|
  User.create(name: "test#{user_number}", email: "#{user_number}@gmail.com", gender: "男性", image: File.open("./public/images/user_images/man#{rand(1..3)}.jpg"), password: "foobar#{user_number}", password_confirmation: "foobar#{user_number}")
end

(13..24).each do |user_number|
  User.create(name: "test#{user_number}", email: "#{user_number}@gmail.com", gender: "女性", image: File.open("./public/images/user_images/woman#{rand(1..3)}.jpg"), password: "foobar#{user_number}", password_confirmation: "foobar#{user_number}")
end

User.create(name: "admin", email: "adminstrator@gmail.com", gender: "男性", image: File.open("./public/images/user_images/man#{rand(1..3)}.jpg"), password: "administrator", password_confirmation: "administrator", admin: true)

(1..30).each do |user_id|
  if user_id == 29
    Relationship.create(user_id: user_id, follow_id: 30)
    Relationship.create(user_id: user_id, follow_id: 1)
  elsif user_id == 30
    Relationship.create(user_id: user_id, follow_id: 1)
    Relationship.create(user_id: user_id, follow_id: 2)
  else
    Relationship.create(user_id: user_id, follow_id: user_id + 1)
    Relationship.create(user_id: user_id, follow_id: user_id + 2)
  end
end
