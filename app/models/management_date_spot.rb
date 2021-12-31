class ManagementDateSpot < ApplicationRecord
  belongs_to :management
  belongs_to :date_spot
  validates :management_id, presence: true
  validates :date_spot_id, presence: true
  validates :procedure, presence: true
end
