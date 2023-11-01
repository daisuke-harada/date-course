# == Schema Information
#
# Table name: during_spots
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  course_id    :bigint           not null
#  date_spot_id :bigint           not null
#
# Indexes
#
#  index_during_spots_on_course_id     (course_id)
#  index_during_spots_on_date_spot_id  (date_spot_id)
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#  fk_rails_...  (date_spot_id => date_spots.id)
#
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
