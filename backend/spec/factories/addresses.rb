FactoryBot.define do
  factory :address do
    id { 1 }
    prefecture_id { Prefecture.find_by(id: 40).id }
    city_name { "福岡市博多区住吉１丁目２" }
    association :date_spot
  end
end
