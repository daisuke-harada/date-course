class DateSpot < ApplicationRecord
  has_one :address, dependent: :destroy
  validates :name, presence: true
end
