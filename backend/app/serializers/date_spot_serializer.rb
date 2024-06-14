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
