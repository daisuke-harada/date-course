FactoryBot.define do
  factory :date_spot do
    id {1}
    name { "test1" }
    opening_time { "08:00" }
    closing_time { "23:00" }
  end
end
