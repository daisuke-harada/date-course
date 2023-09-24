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

  def self.ransackable_attributes(auth_object = nil)
    ["closing_time", "created_at", "genre_id", "id", "image", "name", "opening_time", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["address", "date_spot_reviews", "during_spots", "genre"]
  end
end
