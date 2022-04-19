FactoryBot.define do
  factory :course do
    id { 1 }
    travel_mode { 'DRIVING' }
    authority { '公開' }
    association :user
  end

  factory :other_course, class: Course do
    id { 2 }
    travel_mode { 'WALKING' }
    authority { '公開' }
    association :user, factory: :other_user
  end
end
