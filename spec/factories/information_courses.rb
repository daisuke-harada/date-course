FactoryBot.define do
  factory :information_course do
    id { 1 }
    association :date_spot
    association :course
  end
end
