FactoryBot.define do
  factory :information_course do
    procedure { 1 }
    association :date_spot
    association :course
  end
end
