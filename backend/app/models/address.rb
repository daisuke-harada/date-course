class Address < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  belongs_to :date_spot
  # geocodeは一旦コメントアウトする。
  # 課金する必要があるため
  # geocoded_by :city_name
  # after_validation :geocode, :if => :city_name_changed?

  validates :city_name, presence: true
  validates :prefecture_id, presence: true

  # ransackようのmethod
  def self.ransackable_attributes(auth_object = nil)
    ["city_name", "created_at", "date_spot_id", "id", "latitude", "longitude", "prefecture_id", "updated_at"]
  end

  # addressとDateSpotとgenre名を結合したデータを作成する
  def address_and_date_spot_and_genre_name
    {
      id: id,
      city_name: city_name,
      prefecture_name: Prefecture.find(prefecture_id).name,
      date_spot: date_spot,
      genre_name: date_spot.genre.name,
      latitude: latitude,
      longitude: longitude,
      review_total_number: DateSpotReview.where(date_spot_id: date_spot.id).count,
      average_rate: average_rate_calculation(DateSpotReview.where(date_spot_id: date_spot.id))
    }
  end
end
