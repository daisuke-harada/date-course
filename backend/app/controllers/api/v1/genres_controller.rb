class Api::V1::GenresController < ApplicationController
  def show
    date_spots = DateSpot.where(genre_id: params[:id])
    @address_and_date_spots = date_spots.map do |date_spot|
      address_and_date_spot_and_genre_name(date_spot.address)
    end
    render json: {address_and_date_spots: @address_and_date_spots}
  end
end
