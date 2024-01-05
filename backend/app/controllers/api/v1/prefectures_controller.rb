class Api::V1::PrefecturesController < ApplicationController
  def show
    address_and_date_spots = Address.where(prefecture_id: params[:id]).map do |address|
      AddressSerializer.new(address)
    end

    render json: {address_and_date_spots: address_and_date_spots}
  end
end
