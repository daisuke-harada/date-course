FactoryBot.define do
  factory :management do
    id { 1 }
    traffic_mode { "DRIVING" }
    association :user
  end
end
