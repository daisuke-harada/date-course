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
