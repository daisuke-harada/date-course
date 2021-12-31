class Management < ApplicationRecord
  belongs_to :user
  has_many :management_date_spots, dependent: :destroy
  validates :user_id, presence: true
end
