class Course < ApplicationRecord
  has_many :during_spots, dependent: :destroy
  belongs_to :user

  validates :user_id, presence: true
  validates :authority, presence: true
  validates :travel_mode, presence: true

  # コース情報を返す
  def info
    {
      id: id,
      user: user.user_and_userFollowingsAndFollowers,
      travel_mode: travel_mode,
      authority: authority,
      course_during_spots: during_address_and_date_spots(self),
      no_duplicate_prefecture_names: course_prefecture_names_no_duplicate(self)
    }
  end
end
