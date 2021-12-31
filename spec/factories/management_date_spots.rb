FactoryBot.define do
  factory :management_date_spot do
    association :management
    association :date_spot
    procedure { 1 }
  end
end
