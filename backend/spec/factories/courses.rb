FactoryBot.define do
  factory :course do
    id { 1 }
    travel_mode { 'DRIVING' }
    authority { '公開' }
    association :user
  end
end
