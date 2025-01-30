class Api::V1::PrefecturesController < ApplicationController
  def show
    address_and_date_spots = Address.includes(date_spot: :date_spot_reviews).where(prefecture_id: params[:id]).map do |address|
      AddressSerializer.new(address).serializable_hash
    end

    render status: :ok, json: address_and_date_spots
  end
end
