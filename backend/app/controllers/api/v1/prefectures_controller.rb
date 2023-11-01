class Api::V1::PrefecturesController < ApplicationController
  def show
    addresses = Address.where(prefecture_id: params[:id])
    address_and_date_spots = addresses.map do |address|
      address.combined_data_with_address_and_genre
    end
    render json: {address_and_date_spots: address_and_date_spots}
  end
end
