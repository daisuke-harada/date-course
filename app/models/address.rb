class Address < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  belongs_to :date_spot

  validates :prefecture_id, presence: true
  validates :date_spot_id, presence: true
  validates :city, presence: true
end
