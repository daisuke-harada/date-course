class Api::V1::DateSpotReviewsController < ApplicationController

  def create
    @date_spot_review = DateSpotReview.new(date_spot_review_params)
    if @date_spot_review.save
      render json: { status: :created }
    else
      render json: { status: 500, error_messages: @date_spot_review.errors.messages }
    end
  end

  private

  def date_spot_review_params
    params.require(:date_spot_review).permit(:rate, :content, :user_id, :date_spot_id)
  end
end
