class Api::V1::GenresController < ApplicationController
  def show
    date_spots = DateSpot.where(genre_id: params[:id])
    @address_and_date_spots = date_spots.map do |date_spot|
      date_spot.address.combined_data_with_address_and_genre
    end
    render json: {address_and_date_spots: @address_and_date_spots}
  end
end
