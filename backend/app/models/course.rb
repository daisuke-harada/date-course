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
      user: user.info_with_following_and_followers_ids,
      travel_mode: travel_mode,
      authority: authority,
      course_during_spots: during_address_and_date_spots,
      no_duplicate_prefecture_names: course_prefecture_names_no_duplicate
    }
  end

  # デートコース関連
  # コース内のデートスポットの情報を配列にして返す
  def during_address_and_date_spots
    during_spots.map do |during_spot|
      Address.find_by(date_spot_id: during_spot.date_spot_id).combined_data_with_address_and_genre
    end
  end

  # コース内のルート範囲の県名を返す
  def course_prefecture_names_no_duplicate
    prefecture_name = during_spots.map do |during_spot|
      # during_spotから県名を取り出す
      Prefecture.find(Address.find_by(date_spot_id: during_spot.date_spot_id).prefecture_id).name
    end

    # 県名の重複をなくして返す
    prefecture_name.uniq
  end
end
