FactoryBot.define do
  factory :date_spot_review do
    user_id { 1 }
    spot_id { 1 }
    rate { 1 }
    content { "MyText" }
  end
end
