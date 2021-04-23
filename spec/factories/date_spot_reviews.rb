FactoryBot.define do
  factory :date_spot_review do
    id { 1 }
    rate { 1 }
    content { "MyText" }
    user_id { 1 }
    date_spot_id { 1 }
    association :date_spot
    association :user
  end
end
