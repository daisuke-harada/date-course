FactoryBot.define do
  factory :user do
    name {"田中健太郎"}
    email {"kenta@gmail.com"}
    sex {1}
    password {"foobar"}
    password_confirmation {"foobar"}
  end

  factory :guest, class: User do
    id {1}
    name {"guest"}
    email {"guest@gmail.com"}
    sex {1}
    password {"foobar"}
    password_confirmation {"foobar"}
  end
end
