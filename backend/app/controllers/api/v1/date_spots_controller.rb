class Api::V1::DateSpotsController < ApplicationController
  before_action :date_spot_find_param_id, only: [:show, :update, :destroy]

  def create
    binding.pry
    @date_spot = DateSpot.new(
      name: params[:name],
      genre_id: params[:genre_id],
      opening_time: params[:opening_time],
      closing_time: params[:closing_time],
      image: params[:image],

    )
    binding.pry
    if @date_spot.save
      @address = Address.create(prefecture_id: param[:prefecture_id], city_name: params[:city_name], date_spot_id: @date_spot.id)
      render json: { status: :created, date_spot: @date_spot }
    else
      render json: { status: 500, error_messages: @date_spot.errors.messages}
    end
  end

  def update
  end

  def destroy
  end

  def show
  end

  def index
  end

  private

  # def date_spot_params
  #   params.permit(
  #     :name,
  #     :genre_id,
  #     :opening_time,
  #     :closing_time,
  #     :image,
  #     :prefecture_id,
  #     :city_name
  #   )
  # end

  def date_spot_find_param_id
    @date_spot = DateSpot.find(params[:id])
  end
end
