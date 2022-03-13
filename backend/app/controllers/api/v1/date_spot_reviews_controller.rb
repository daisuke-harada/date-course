class Api::V1::DateSpotReviewsController < ApplicationController

  def create
    binding.pry
    @date_spot_review = DateSpotReview.new(date_spot_review_params)
    binding.pry
    if @date_spot_review.save
      render json: { status: :created }
    else
      render json: { status: 500 }
    end
  end

  private

  def date_spot_review_params
    params.require(:date_spot_review).permit(:rate, :content, :user_id, :date_spot_id)
  end
end
