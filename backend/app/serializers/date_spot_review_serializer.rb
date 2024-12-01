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
class DateSpotReviewSerializer < ActiveModel::Serializer
  belongs_to :date_spot
  attributes :id, :rate, :content, :user_id, :date_spot_id

  attribute :user_name do
    object.user.name
  end

  attribute :user_gender do
    object.user.gender
  end

  attribute :user_image do
    object.user.image
  end
end
