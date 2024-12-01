# == Schema Information
#
# Table name: courses
#
#  id          :bigint           not null, primary key
#  authority   :string           not null
#  travel_mode :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_courses_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Course < ApplicationRecord
  belongs_to :user
  has_many :during_spots, dependent: :destroy
  has_many :date_spots, through: :during_spots

  validates :user_id, presence: true
  validates :authority, presence: true
  validates :travel_mode, presence: true
end
