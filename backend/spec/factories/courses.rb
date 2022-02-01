FactoryBot.define do
  factory :course do
    id { 1 }
    authority { true }
    association :user
  end

  factory :private_course, class: Course do
    id { 2 }
    authority { false }
    association :user
  end
end
