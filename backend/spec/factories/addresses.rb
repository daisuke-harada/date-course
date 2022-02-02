FactoryBot.define do
  factory :address do
    id { 1 }
    prefecture_id { Prefecture.find_by(id: 40).id }
    city_name { "福岡市博多区住吉１丁目２" }
    association :date_spot
  end

  factory :other_address, class: Address do
    id { 2 }
    prefecture_id { Prefecture.find_by(id: 40).id }
    city_name { "福岡市中央区大名１-１１-２２-１" }
    association :date_spot, factory: :other_spot # oter_spotという名前のdate_spotモデルに対してアソシエーションを通す
  end
end