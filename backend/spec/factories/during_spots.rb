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
FactoryBot.define do
  factory :during_spot do
    association :course
    association :date_spot
  end

  factory :other_during_spot, class: DuringSpot do
    course_id { 1 }
    association :date_spot, factory: :other_spot
  end

  factory :another_during_spot, class: DuringSpot do
    course_id { 2 }
    date_spot_id { 2 }
  end
end
