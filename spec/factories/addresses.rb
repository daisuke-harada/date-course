FactoryBot.define do
  factory :address do
    id {1}
    prefecture_id { Prefecture.find_by(name: "福岡県").id }
    city_name { "福岡市南区長丘3丁目9-10" }
    association :date_spot
  end
end
