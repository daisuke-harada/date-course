class Api::V1::DateSpotsController < ApplicationController
  before_action :set_date_spot, only: [:show, :update, :destroy]

  def index
    if params[:date_spot_name].present? || params[:prefecture_id].present? || params[:genre_id].present? || params[:come_time].present?
      date_spots = DateSpot.includes(:address, :date_spot_reviews).ransack(
        name_cont: params[:date_spot_name],
        address_prefecture_id_eq: params[:prefecture_id],
        genre_id_eq: params[:genre_id],
        opening_time_lteq: params[:come_time],
        closing_time_gteq: params[:come_time]
      ).result

      # map to address serializer and deduplicate by address id
      address_and_date_spots = date_spots.map { |date_spot| AddressSerializer.new(date_spot.address).serializable_hash }
    else
      address_and_date_spots = Address.includes(date_spot: :date_spot_reviews).map do |address|
        AddressSerializer.new(address).serializable_hash
      end
    end

    render status: :ok, json: address_and_date_spots
  end

  def show
    address = @date_spot.address
    date_spot_reviews = @date_spot.date_spot_reviews.includes(:user, :date_spot).map { |date_spot_review| DateSpotReviewSerializer.new(date_spot_review, include_user_info: true).attributes }

    render status: :ok, json: {
      address_and_date_spot: AddressSerializer.new(address),
      review_average_rate: @date_spot.average_rate_calculation,
      date_spot_reviews: date_spot_reviews
    }
  end

  def create
    date_spot_form = DateSpotForm.new(date_spot_params)
    date_spot = date_spot_form.save
    if date_spot
      render status: :created, json: {date_spot_id: date_spot.id}
    else
      render status: :unprocessable_entity, json: ErrorSerializer.new(date_spot_form).as_json
    end
  end

  def update
    date_spot_form = DateSpotForm.new(date_spot_params)
    if date_spot_form.update(@date_spot)
      render status: :ok, json: {date_spot_id: @date_spot.id}
    else
      render status: :unprocessable_entity, json: ErrorSerializer.new(date_spot_form).as_json
    end
  end

  def destroy
    @date_spot.destroy
    render status: :no_content
  end

  private

  def set_date_spot
    @date_spot = DateSpot.find(params[:id])
  end

  def date_spot_params
    params.require(:date_spot).permit(
      :id,
      :name,
      :genre_id,
      :opening_time,
      :closing_time,
      :image,
      :prefecture_id,
      :city_name
    )
  end
end
