FactoryBot.define do
  factory :address do
    id {1}
    prefecture_id { Prefecture.find_by(id: 40).id }
    city_name { "福岡市南区長丘3丁目9-10" }
    association :date_spot
  end

  factory :other_address, class: Address do
    id {2}
    prefecture_id { Prefecture.find_by(id: 40).id }
    city_name { "福岡市南区長丘5丁目100-14" }
    association :other_spot
  end
end
