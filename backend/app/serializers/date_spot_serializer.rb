class DateSpotSerializer < ActiveModel::Serializer
  has_one :address
  has_many :date_spot_reviews
  has_many :courses

  attributes :id, :name, :image, :closing_time, :opening_time, :created_at, :updated_at

  attribute :average_rate do
    object.average_rate_calculation
  end

  attribute :genre_id do
    object.genre_id
  end
end
