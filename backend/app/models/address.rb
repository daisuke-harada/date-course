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
class Address < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  belongs_to :date_spot
  delegate :name, to: :prefecture, prefix: true

  geocoded_by :city_name
  after_validation :geocode, if: :city_name_changed?

  validates :city_name, presence: true
  validates :prefecture_id, presence: true

  # ransackようのmethod
  def self.ransackable_attributes(auth_object = nil)
    ["city_name", "created_at", "date_spot_id", "id", "latitude", "longitude", "prefecture_id", "updated_at"]
  end
end
