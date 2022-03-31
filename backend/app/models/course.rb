class Course < ApplicationRecord
  has_many :during_spots, dependent: :destroy
  belongs_to :user

  validates :user_id, presence: true
  validates :authority, presence: true
  validates :traffic_mode, presence: true
end
