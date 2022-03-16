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
    # date_spotとaddressを結合してJSON形式で返す
    render json: Address.all.to_json(include: :date_spot)
  end

  def show
    @address = @date_spot.address
    @genre_name = @date_spot.genre.name
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

    # 評価の平均値を計算する
    review_rate_total = 0
    @date_spot.date_spot_reviews.each{ |review| review_rate_total+=review.rate}
    review_average_rate = review_rate_total == 0? 0: review_rate_total / @date_spot.date_spot_reviews.length

    render json: {
      date_spot: @date_spot,
      address: @address,
      genre_name: @genre_name,
      review_average_rate: review_average_rate,
      date_spot_reviews: @date_spot_reviews
    }
  end

  private

  def date_spot_find_param_id
    @date_spot = DateSpot.find(params[:id])
  end
end
