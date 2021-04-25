FactoryBot.define do
  factory :date_spot_review do
    rate { 1 }
    content { "MyText" }
    association :date_spot
    association :user
  end

  factory :other_date_spot_review, class: DateSpotReview do
    rate { 1 }
    content { "MyText2" }
    association :other_spot
    association :user
  end
end
