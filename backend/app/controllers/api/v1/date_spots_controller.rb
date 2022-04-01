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
    render json: {status: :delete}
  end

  def index
    addresses = Address.all
    @address_and_date_spots = addresses.map do |address|
      address_and_date_spot_and_genre_name(address)
    end
    render json: {address_and_date_spots: @address_and_date_spots }
  end

  def show
    @address = @date_spot.address
    @date_spot_reviews = @date_spot.date_spot_reviews.map do |date_spot_review|
      {
        id: date_spot_review.id,
        rate: date_spot_review.rate,
        content: date_spot_review.content,
        user_name: date_spot_review.user.name,
        user_gender: date_spot_review.user.gender,
        user_image: date_spot_review.user.image,
        user_id: date_spot_review.user_id,
        date_spot_id: date_spot_review.date_spot_id,
      }
    end

    render json: {
      address_and_date_spot: address_and_date_spot_and_genre_name(@address),
      review_average_rate: average_rate_calculation(@date_spot.date_spot_reviews),
      date_spot_reviews: @date_spot_reviews
    }
  end

  private

  def date_spot_find_param_id
    @date_spot = DateSpot.find(params[:id])
  end

  # 評価の平均値を計算する
  def average_rate_calculation(reviews)
    reviews.sum(:rate)
    review_average_rate = reviews.sum(:rate) == 0? 0: reviews.sum(:rate) / reviews.count
  end
end
