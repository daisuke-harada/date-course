class Api::V1::GenresController < ApplicationController
  def show
    address_and_date_spots = DateSpot.where(genre_id: params[:id]).map do |date_spot|
      AddressSerializer.new(date_spot.address)
    end
    render json: {address_and_date_spots: address_and_date_spots}
  end
end
