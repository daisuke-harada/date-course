class Address < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  belongs_to :date_spot
  geocoded_by :city_name
  after_validation :geocode, :if => :city_name_changed?
  validates :city_name, presence: true
  validates :date_spot_id, presence: true
end
