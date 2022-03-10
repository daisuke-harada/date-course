class DateSpot < ApplicationRecord
  mount_uploader :image, ImageUploader
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :genre

  has_one :address, dependent: :destroy
  accepts_nested_attributes_for :address
  validates :name, presence: true
  validates :genre_id, presence: true
end
