FactoryBot.define do
  factory :management do
    id { 1 }
    association :user
  end
end
