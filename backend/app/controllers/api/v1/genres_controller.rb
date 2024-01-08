class Api::V1::GenresController < ApplicationController
  def show
    render json: {address_and_date_spots: DateSpot.where(genre_id: params[:id]).map { |date_spot| AddressSerializer.new(date_spot.address) }}
  end
end
