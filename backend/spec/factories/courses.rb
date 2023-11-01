# == Schema Information
#
# Table name: courses
#
#  id          :bigint           not null, primary key
#  authority   :string(255)      not null
#  travel_mode :string(255)      not null
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
FactoryBot.define do
  factory :course do
    id { 1 }
    travel_mode { "DRIVING" }
    authority { "公開" }
    association :user
  end

  factory :other_course, class: Course do
    id { 2 }
    travel_mode { "WALKING" }
    authority { "公開" }
    association :user, factory: :other_user
  end
end
