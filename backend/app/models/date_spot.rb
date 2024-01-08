# == Schema Information
#
# Table name: date_spots
#
#  id           :bigint           not null, primary key
#  closing_time :datetime
#  image        :string(255)
#  name         :string(255)
#  opening_time :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  genre_id     :integer
#
# Indexes
#
#  index_date_spots_on_genre_id_and_created_at  (genre_id,created_at)
#
class DateSpot < ApplicationRecord
  mount_uploader :image, ImageUploader
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :genre
  has_one :address, dependent: :destroy
  accepts_nested_attributes_for :address
  has_many :date_spot_reviews, dependent: :destroy
  has_many :during_spots, dependent: :destroy
  has_many :courses, through: :during_spots

  validates :name, presence: true
  validates :genre_id, presence: true

  # ransackに必要な定義
  def self.ransackable_attributes(auth_object = nil)
    ["closing_time", "created_at", "genre_id", "id", "image", "name", "opening_time", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["address", "date_spot_reviews", "during_spots", "genre"]
  end

  # date_spot_reviewの評価の平均値を計算する
  def average_rate_calculation
    # レビューが空の場合は0を返す
    return 0 if date_spot_reviews.empty?

    # レビューの評価の合計を計算
    review_rate_total = date_spot_reviews.sum(&:rate)

    # 評価の合計が0の場合は0を返し、そうでなければ平均値を計算して返す
    (review_rate_total == 0) ? 0 : review_rate_total / date_spot_reviews.length.to_f
  end
end
