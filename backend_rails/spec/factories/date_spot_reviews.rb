# == Schema Information
#
# Table name: date_spot_reviews
#
#  id           :bigint           not null, primary key
#  content      :text
#  rate         :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  date_spot_id :bigint
#  user_id      :bigint
#
# Indexes
#
#  index_date_spot_reviews_on_date_spot_id  (date_spot_id)
#  index_date_spot_reviews_on_user_id       (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (date_spot_id => date_spots.id)
#  fk_rails_...  (user_id => users.id)
#
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
