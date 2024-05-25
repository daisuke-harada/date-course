class DateSpotSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :closing_time, :opening_time, :created_at, :updated_at, :average_rate

  # belongs_to :genre
  has_one :address
  has_many :date_spot_reviews
  has_many :courses

  def average_rate
    object.average_rate_calculation
  end
end