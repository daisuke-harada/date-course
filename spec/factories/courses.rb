FactoryBot.define do
  factory :course do
    id { 1 }
    authority { false }
    association :user
  end
end
