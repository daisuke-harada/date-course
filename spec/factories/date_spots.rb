FactoryBot.define do
  factory :date_spot do
    id {1}
    name { "MyString" }
    business_hour { "08:00 ~ 21:00" }
    #第一引数がmodel名 第二引数がモデルで定義されている名前
    association :user, factory: :admin
  end
end
