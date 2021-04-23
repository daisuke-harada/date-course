class DateSpotReview < ApplicationRecord
  belongs_to :user
  belongs_to :date_spot
  validates :user_id, presence: true
  validates :date_spot_id, presence: true
end
