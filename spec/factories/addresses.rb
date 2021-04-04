FactoryBot.define do
  factory :address do
    prefecture_id { Prefecture.find_by(name: "福岡県").id }
    city { "福岡市" }
  end
end
