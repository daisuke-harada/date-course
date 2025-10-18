# 重複を避けるためfind_or_create_byを使用
User.find_or_create_by(email: "guest@gmail.com") do |user|
  user.name = "guest"
  user.gender = "男性"
  user.image = File.open("./public/images/user_images/man#{rand(1..3)}.jpg")
  user.password = "foobar"
  user.password_confirmation = "foobar"
end

User.find_or_create_by(email: "daisuke@gmail.com") do |user|
  user.name = "daisuke"
  user.gender = "男性"
  user.image = File.open("./public/images/user_images/man#{rand(1..3)}.jpg")
  user.password = "daisuke"
  user.password_confirmation = "daisuke"
end

User.find_or_create_by(email: "kenta@gmail.com") do |user|
  user.name = "peter"
  user.gender = "男性"
  user.image = File.open("./public/images/user_images/spiderman.png")
  user.password = "foobar"
  user.password_confirmation = "foobar"
end

User.find_or_create_by(email: "marika@gmail.com") do |user|
  user.name = "marika"
  user.gender = "女性"
  user.image = File.open("./public/images/user_images/woman#{rand(1..3)}.jpg")
  user.password = "marika"
  user.password_confirmation = "marika"
end

User.find_or_create_by(email: "nanase@gmail.com") do |user|
  user.name = "nanase"
  user.gender = "女性"
  user.image = File.open("./public/images/user_images/woman#{rand(1..3)}.jpg")
  user.password = "nanase"
  user.password_confirmation = "nanase"
end

User.find_or_create_by(email: "kanakana@gmail.com") do |user|
  user.name = "kanakana"
  user.gender = "女性"
  user.image = File.open("./public/images/user_images/woman#{rand(1..3)}.jpg")
  user.password = "kanakana"
  user.password_confirmation = "kanakana"
end

(1..12).each do |user_number|
  User.find_or_create_by(email: "#{user_number}@gmail.com") do |user|
    user.name = "test#{user_number}"
    user.gender = "男性"
    user.image = File.open("./public/images/user_images/man#{rand(1..3)}.jpg")
    user.password = "foobar#{user_number}"
    user.password_confirmation = "foobar#{user_number}"
  end
end

(13..24).each do |user_number|
  User.find_or_create_by(email: "#{user_number}@gmail.com") do |user|
    user.name = "test#{user_number}"
    user.gender = "女性"
    user.image = File.open("./public/images/user_images/woman#{rand(1..3)}.jpg")
    user.password = "foobar#{user_number}"
    user.password_confirmation = "foobar#{user_number}"
  end
end

User.find_or_create_by(email: "adminstrator@gmail.com") do |user|
  user.name = "admin"
  user.gender = "男性"
  user.image = File.open("./public/images/user_images/man#{rand(1..3)}.jpg")
  user.password = "adminstrator"
  user.password_confirmation = "adminstrator"
  user.admin = true
end

# Relationshipも重複を防ぐ
(1..30).each do |user_id|
  if user_id == 29
    Relationship.find_or_create_by(user_id: user_id, follow_id: 30)
    Relationship.find_or_create_by(user_id: user_id, follow_id: 1)
  elsif user_id == 30
    Relationship.find_or_create_by(user_id: user_id, follow_id: 1)
    Relationship.find_or_create_by(user_id: user_id, follow_id: 2)
  else
    Relationship.find_or_create_by(user_id: user_id, follow_id: user_id + 1)
    Relationship.find_or_create_by(user_id: user_id, follow_id: user_id + 2)
  end
end
