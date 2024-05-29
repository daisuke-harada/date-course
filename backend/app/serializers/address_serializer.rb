# == Schema Information
#
# Table name: addresses
#
#  id            :bigint           not null, primary key
#  city_name     :string(255)
#  latitude      :float(24)
#  longitude     :float(24)
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
class AddressSerializer < ActiveModel::Serializer
  belongs_to :date_spot
  attributes :id, :city_name, :latitude, :longitude

  attribute :prefecture_name do
    # active_hashのprefectureを呼び出せないためこのような書き方にした
    object.prefecture_name
  end

  attribute :genre_name do
    object.date_spot.genre.name
  end

  attribute :review_total_number do
    object.date_spot.date_spot_reviews.size
  end

  attribute :average_rate do
    object.date_spot.average_rate_calculation
  end
end
