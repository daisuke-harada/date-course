class Course < ApplicationRecord
  belongs_to :user
  has_many :information_courses, dependent: :destroy
end
