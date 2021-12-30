class ManagementCourse < ApplicationRecord
  belongs_to :course
  belongs_to :date_spot
end
