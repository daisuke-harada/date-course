class Api::V1::DateSpotReviewsController < ApplicationController
  before_action :set_date_spot, only: [:destroy, :update]
  before_action :set_date_spot_reviews, only: [:create, :update, :destroy]

  def create
    @date_spot_review = DateSpotReview.new(date_spot_review_params)
    if @date_spot_review.save
      render json: {status: :created, date_spot_reviews: @date_spot_reviews, review_average_rate: @date_spot_review.date_spot.average_rate_calculation}
    else
      render json: {status: 500, error_messages: @date_spot_review.errors.messages}
    end
  end

  def update
    if @date_spot_review.update(date_spot_review_params)
      render json: {status: :updated, date_spot_reviews: @date_spot_reviews, review_average_rate: @date_spot_review.date_spot.average_rate_calculation}
    else
      render json: {status: 500, error_messages: @date_spot_review.errors.messages}
    end
  end

  def destroy
    @date_spot_review.destroy
    render json: {status: :deleted, date_spot_reviews: @date_spot_reviews, review_average_rate: @date_spot_review.date_spot.average_rate_calculation}
  end

  private

  def date_spot_review_params
    params.require(:date_spot_review).permit(:rate, :content, :user_id, :date_spot_id)
  end

  def set_date_spot
    @date_spot_review = DateSpotReview.find(params[:id])
  end

  def set_date_spot_reviews
    @date_spot_reviews = DateSpotReview.where(date_spot_id: @date_spot_review.date_spot_id).map { |date_spot_review| DateSpotReviewSerializer.new(date_spot_review, include_user_info: true).attributes }
  end
end
