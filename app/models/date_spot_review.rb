class DateSpotReview < ApplicationRecord
  belongs_to :user
  belongs_to :date_spot

  validates :content, presence: true, length: { maximum: 300 }
  
  # user_idとdate_spot_idの二つの組み合わせに対して一意制約のバリデーションをかける
  validates :user_id, presence: true, :uniqueness => {:scope => :date_spot_id}
  validates :date_spot_id, presence: true
end
