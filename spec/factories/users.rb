FactoryBot.define do
  factory :user do
    name {"田中健太郎"}
    email {"kenta@gmail.com"}
    sex {1}
    password {"foobar"}
    password_confirmation {"foobar"}
  end
end
