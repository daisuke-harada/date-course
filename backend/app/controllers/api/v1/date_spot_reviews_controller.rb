class Api::V1::DateSpotReviewsController < ApplicationController

  def create
    @date_spot_review = DateSpotReview.new(date_spot_review_params)
    if @date_spot_review.save
      @date_spot_reviews = DateSpotReview.where(date_spot_id: @date_spot_review.date_spot_id)
      render json: { status: :created, date_spot_reviews: @date_spot_reviews }
    else
      render json: { status: 500, error_messages: @date_spot_review.errors.messages }
    end
  end

  private

  def date_spot_review_params
    params.require(:date_spot_review).permit(:rate, :content, :user_id, :date_spot_id)
  end
end
