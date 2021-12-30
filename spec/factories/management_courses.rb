FactoryBot.define do
  factory :management_course do
    id { 1 }
    association :course
    association :date_spot
  end
end
