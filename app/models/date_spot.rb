class DateSpot < ApplicationRecord
  belongs_to :user
  has_one :address, dependent: :destroy
end
