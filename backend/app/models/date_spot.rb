class DateSpot < ApplicationRecord
  mount_uploader :image, ImageUploader
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :genre
  has_one :address, dependent: :destroy
  accepts_nested_attributes_for :address
  has_many :date_spot_reviews, dependent: :destroy
  has_many :during_spots, dependent: :destroy

  validates :name, presence: true
  validates :genre_id, presence: true
end
