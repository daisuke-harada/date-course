FactoryBot.define do
  factory :management_course do
    procedure { 1 }
    association :user
    association :date_spot
  end
end
