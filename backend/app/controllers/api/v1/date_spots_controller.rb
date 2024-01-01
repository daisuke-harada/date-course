class Api::V1::DateSpotsController < ApplicationController
  before_action :set_date_spot, only: [:show, :update, :destroy]

  def index
    addresses = Address.all
    address_and_date_spots = addresses.map do |address|
      address.combined_data_with_address_and_genre
    end
    render json: {address_and_date_spots: address_and_date_spots}
  end

  def show
    puts params
    puts @date_spot

    address = @date_spot.address
    date_spot_reviews = @date_spot.date_spot_reviews.map { |date_spot_review| DateSpotReviewSerializer.new(date_spot_review, include_user_info: true).attributes }

    render json: {
      address_and_date_spot: address.combined_data_with_address_and_genre,
      review_average_rate: @date_spot.average_rate_calculation,
      date_spot_reviews: date_spot_reviews
    }
  end

  def create
    date_spot = DateSpot.new(
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

    if date_spot.save
      render json: {status: :created, date_spot: date_spot}
    else
      render json: {status: 500, error_messages: date_spot.errors.messages}
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
      render json: {status: :updated, date_spot: @date_spot}
    else
      render json: {status: 500, error_messages: @date_spot.errors.messages}
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

  # 評価の平均値を計算する
  def average_rate_calculation(reviews)
    (reviews.sum(:rate) == 0) ? 0 : (reviews.sum(:rate) / reviews.count).floor(1).to_f
  end
end
