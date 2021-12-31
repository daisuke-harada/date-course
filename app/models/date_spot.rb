class DateSpot < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :genre

  has_one :address, dependent: :destroy
  # userを介して関連レコード(address)に属性を保存できます。viewページの
  accepts_nested_attributes_for :address
  has_many :date_spot_reviews, dependent: :destroy
  has_one_attached :image
  has_many :information_courses, dependent: :destroy
  has_many :management_courses, dependent: :destroy
  validates :name, presence: true

  # 画像のファイルのバリデーション
  validate :image_type
end
