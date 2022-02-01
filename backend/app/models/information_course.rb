class InformationCourse < ApplicationRecord
  belongs_to :course
  belongs_to :date_spot
  validates :course_id, presence: true
  validates :date_spot_id, presence: true
end
