FactoryBot.define do
  factory :address do
    id {1}
    prefecture_id { Prefecture.find_by(id: 40).id }
    date_spot_id {1}
    city_name { "福岡市南区長丘3丁目9-10" }
    association :date_spot
    association :prefecture
  end
end
