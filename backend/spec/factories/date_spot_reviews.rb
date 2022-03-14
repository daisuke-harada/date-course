FactoryBot.define do
  factory :date_spot_review do
    id { 1 }
    rate { 1 }
    content { "MyText" }
    user_id { 1 }
    date_spot_id { 1 }
  end

  factory :other_date_spot_review, class: DateSpotReview do
    id { 2 }
    rate { 1 }
    content { "MyText2" }
    user_id { 1 }
    date_spot_id { 1 }
  end
end
