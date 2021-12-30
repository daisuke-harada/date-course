class Course < ApplicationRecord
  belongs_to :user
  has_many :management_courses, dependent: :destroy
end
