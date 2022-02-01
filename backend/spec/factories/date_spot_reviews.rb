FactoryBot.define do
  factory :date_spot_review do
    id { 1 }
    rate { 1 }
    content { "MyText" }
    association :date_spot
    association :user
  end

  factory :other_date_spot_review, class: DateSpotReview do
    id { 2 }
    rate { 1 }
    content { "MyText2" }
    association :date_spot, factory: :other_spot
    association :user, factory: :other_user
  end
end
