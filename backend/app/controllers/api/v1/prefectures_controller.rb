class Api::V1::PrefecturesController < ApplicationController
  def show
    addresses = Address.where(prefecture_id: params[:id])
    @address_and_date_spots = addresses.map do |address|
      address_and_date_spot_and_genre_name(address)
    end
    render json: {address_and_date_spots: @address_and_date_spots }
  end
end
