# == Schema Information
#
# Table name: date_spot_reviews
#
#  id           :bigint           not null, primary key
#  content      :text(65535)
#  rate         :float(24)
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
  attributes :id, :rate, :content, :user_id, :date_spot_id

  attribute :user_name, if: :user_info_included?
  attribute :user_gender, if: :user_info_included?
  attribute :user_image, if: :user_info_included?

  def user_info_included?
    instance_options[:include_user_info]
  end
end
