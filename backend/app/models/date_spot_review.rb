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
class DateSpotReview < ApplicationRecord
  belongs_to :user
  belongs_to :date_spot

  validates :content, length: {maximum: 75}
  # user_idとdate_spot_idの二つの組み合わせに対して一意制約のバリデーションをかける
  validates :user_id, presence: true, uniqueness: {scope: :date_spot_id}
  validates :date_spot_id, presence: true
end
