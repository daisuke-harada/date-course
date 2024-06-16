class Api::V1::DateSpotsController < ApplicationController
  before_action :set_date_spot, only: [:show, :update, :destroy]

  def index
    address_and_date_spots = Address.includes(date_spot: :date_spot_reviews).all.map do |address|
      AddressSerializer.new(address).serializable_hash
    end

    render json: {address_and_date_spots: address_and_date_spots}
  end

  def show
    address = @date_spot.address
    date_spot_reviews = @date_spot.date_spot_reviews.includes(:user, :date_spot).map { |date_spot_review| DateSpotReviewSerializer.new(date_spot_review, include_user_info: true).attributes }

    render json: {
      address_and_date_spot: AddressSerializer.new(address),
      review_average_rate: @date_spot.average_rate_calculation,
      date_spot_reviews: date_spot_reviews
    }
  end

  def create
    date_spot_form = DateSpotForm.new(date_spot_params)
    if date_spot_form.save
      render json: {status: :created, date_spot: date_spot}
    else
      render json: ErrorSerializer.new(date_spot).as_json
    end
  end

  def update
    date_spot_form = DateSpotForm.new(date_spot_params)
    if date_spot_form.update(@date_spot)
      render json: {status: :updated, date_spot: @date_spot}
    else
      render json: ErrorSerializer.new(@date_spot).as_json
    end
  end

  def destroy
    @date_spot.destroy
    render json: {status: :deleted}
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

  # 評価の平均値を計算する
  def average_rate_calculation(reviews)
    (reviews.sum(:rate) == 0) ? 0 : (reviews.sum(:rate) / reviews.size).floor(1).to_f
  end
end
