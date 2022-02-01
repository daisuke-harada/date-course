FactoryBot.define do
  factory :management_date_spot do
    id { 1 }
    association :management
    association :date_spot
  end
end
