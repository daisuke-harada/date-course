class User < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_secure_password
  has_many :date_spot_reviews, dependent: :destroy

  validates :name, presence: true, length: { maximum: 50 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
  validates :gender, presence: true
  validates :email, presence: true, length: { maximum: 250 }
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
