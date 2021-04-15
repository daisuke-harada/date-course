class DateSpot < ApplicationRecord
  belongs_to :user
  has_one :address, dependent: :destroy
  validates :user_id, presence: true
  validates :name, presence: true
end
