FactoryBot.define do
  factory :date_spot_review do
    rate { 1 }
    content { "MyText" }
    user { nil }
    date_spot { nil }
  end
end
