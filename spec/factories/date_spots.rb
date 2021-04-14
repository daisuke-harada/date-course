FactoryBot.define do
  factory :date_spot do
    category_id { 1 }
    user_id { 1 }
    address_id { 1 }
    name { "MyString" }
    business_hour { "2021-04-15 08:26:19" }
  end
end
