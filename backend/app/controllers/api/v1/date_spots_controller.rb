class Api::V1::DateSpotsController < ApplicationController
  before_action :date_spot_find_param_id, only: [:show, :update, :destroy]

  def create
    @date_spot = DateSpot.new(
      name: params[:name],
      genre_id: params[:genre_id],
      opening_time: params[:opening_time],
      closing_time: params[:closing_time],
      image: params[:image],
      address_attributes: {
        prefecture_id: params[:prefecture_id],
        city_name: Prefecture.find(params[:prefecture_id]).name + params[:city_name]
      }
    )
    if @date_spot.save
      render json: { status: :created, date_spot: @date_spot }
    else
      render json: { status: 500, error_messages: @date_spot.errors.messages}
    end
  end

  def update

    if @date_spot.update(
      name: params[:name],
      genre_id: params[:genre_id],
      opening_time: params[:opening_time],
      closing_time: params[:closing_time],
      image: params[:image],
      address_attributes: {
        prefecture_id: params[:prefecture_id],
        city_name: Prefecture.find(params[:prefecture_id]).name + params[:city_name]
      }
    )
      render json: {status: :updated, date_spot: @date_spot }
    else
      render json: { status: 500, error_messages: @date_spot.errors.messages}
    end
  end

  def destroy
    @date_spot.destroy
    binding.pry
    render json: {status: :delete}
  end

  def show
    @address = Address.find_by(date_spot_id: @date_spot.id)
    render json: { date_spot: @date_spot, address: @address}
  end

  def index
  end

  private

  def date_spot_find_param_id
    @date_spot = DateSpot.find(params[:id])
  end
end
