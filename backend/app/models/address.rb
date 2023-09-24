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

  def self.ransackable_attributes(auth_object = nil)
    ["city_name", "created_at", "date_spot_id", "id", "latitude", "longitude", "prefecture_id", "updated_at"]
  end
end
