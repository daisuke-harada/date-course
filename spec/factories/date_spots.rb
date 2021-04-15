FactoryBot.define do
  factory :date_spot do
    name { "MyString" }
    business_hour { "2021-04-15 08:26:19" }
    #第一引数がmodel名第二引数がモデルで定義されている名前
    association :user, factory: :admin
    association :address
  end
end
