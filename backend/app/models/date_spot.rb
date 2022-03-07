class DateSpot < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :genre

  has_one :address, dependent: :destroy
  # userを介して関連レコード(address)に属性を保存できます。viewページの
  accepts_nested_attributes_for :address
  validates :name, presence: true
  validates :genre_id, presence: true
end
