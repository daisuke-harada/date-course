FactoryBot.define do
  factory :user do
    id { 1 }
    name { "田中健太郎" }
    email { "kenta@gmail.com" }
    sex { 1 }
    password { "foobar" }
    password_confirmation { "foobar" }
  end

  factory :other_user, class: User do
    id { 2 }
    name { "原田大輔" }
    email { "daisuke@gmail.com" }
    sex { 1 }
    password { "foobar" }
    password_confirmation { "foobar" }
  end

  factory :guest, class: User do
    id { 3 }
    name { "guest" }
    email { "guest@gmail.com" }
    sex { 1 }
    password { "foobar" }
    password_confirmation { "foobar" }
  end

  factory :admin, class: User do
    id { 4 }
    name { "admin" }
    email { "adminstrator@gmail.com" }
    sex { 1 }
    password { "adminlogin1099" }
    password_confirmation { "adminlogin1099" }
    admin { true }
  end
end
