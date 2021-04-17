class DateSpot < ApplicationRecord
  has_one :address, dependent: :destroy
  accepts_nested_attributes_for :address
  validates :name, presence: true
  has_one_attached :image
end
