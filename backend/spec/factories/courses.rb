FactoryBot.define do
  factory :course do
    id { 1 }
    traffic_mode { 'DRIVING' }
    authority { '公開' }
    association :user
  end
end
