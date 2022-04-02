FactoryBot.define do
  factory :date_spot_review do
    id { 1 }
    rate { 1 }
    content { "MyText" }
    association :user
    association :date_spot
  end

  factory :other_date_spot_review, class: DateSpotReview do
    id { 2 }
    rate { 1 }
    content { "MyText2" }
    association :user, factory: :other_user
    date_spot_id { 1 }
  end
end
