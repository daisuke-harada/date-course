class AddressSerializer < ActiveModel::Serializer
  attributes :id, :city_name, :latitude, :longitude

  attribute :prefecture_name do
    # active_hashのprefectureを呼び出せないためこのような書き方にした
    object.prefecture_name
  end

  attribute :date_spot do
    object.date_spot
  end

  attribute :genre_name do
    object.date_spot.genre.name
  end

  attribute :review_total_number do
    DateSpotReview.where(date_spot_id: object.date_spot.id).count
  end

  attribute :average_rate do
    object.date_spot.average_rate_calculation
  end
end
