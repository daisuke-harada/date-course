class DuringSpot < ApplicationRecord
  belongs_to :course
  belongs_to :date_spot

  validates :course_id, presence: true
  validates :date_spot_id, presence: true

  def self.ransackable_attributes(auth_object = nil)
    ["course_id", "created_at", "date_spot_id", "id", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["course", "date_spot"]
  end
end
