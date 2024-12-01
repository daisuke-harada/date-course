# == Schema Information
#
# Table name: addresses
#
#  id            :bigint           not null, primary key
#  city_name     :string
#  latitude      :float
#  longitude     :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  date_spot_id  :integer
#  prefecture_id :integer
#
# Indexes
#
#  index_addresses_on_date_spot_id_and_created_at   (date_spot_id,created_at)
#  index_addresses_on_prefecture_id_and_created_at  (prefecture_id,created_at)
#
FactoryBot.define do
  factory :address do
    id { 1 }
    prefecture_id { Prefecture.find_by(id: 40).id }
    city_name { "福岡市博多区住吉1丁目2" }
    association :date_spot
  end

  factory :other_address, class: Address do
    id { 2 }
    prefecture_id { Prefecture.find_by(id: 40).id }
    city_name { "福岡市中央区大名1-11-22-1" }
    association :date_spot, factory: :other_spot # oter_spotという名前のdate_spotモデルに対してアソシエーションを通す
  end

  factory :another_address, class: Address do
    id { 1 }
    prefecture_id { Prefecture.find_by(id: 40).id }
    city_name { "福岡市博多区住吉1丁目2" }
    date_spot_id { 1 }
  end
end
