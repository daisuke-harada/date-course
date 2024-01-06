class Api::V1::PrefecturesController < ApplicationController
  def show
    render json: {address_and_date_spots: Address.where(prefecture_id: params[:id]).map { |address| AddressSerializer.new(address) }}
  end
end
