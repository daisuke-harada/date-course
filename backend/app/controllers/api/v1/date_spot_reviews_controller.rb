class Api::V1::DateSpotReviewsController < ApplicationController
  before_action :date_spot_review_find_param_id, only: [:destroy, :update]

  def create
    @date_spot_review = DateSpotReview.new(date_spot_review_params)
    if @date_spot_review.save
      @date_spot_reviews = DateSpotReview.where(date_spot_id: @date_spot_review.date_spot_id).map do |date_spot_review|
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

      # デートスポットの評価の平均値を設定する
      review_rate_total = 0
      DateSpotReview.where(date_spot_id: @date_spot_review.date_spot_id).each{ |review| review_rate_total+=review.rate}
      review_average_rate = review_rate_total == 0? 0: review_rate_total / DateSpotReview.where(date_spot_id: @date_spot_review.date_spot_id).length

      render json: { status: :created, date_spot_reviews: @date_spot_reviews, review_average_rate: review_average_rate }
    else
      render json: { status: 500, error_messages: @date_spot_review.errors.messages }
    end
  end

  def destroy
    # date_spotのidを記憶する
    date_spot_id = @date_spot_review.date_spot_id

    # date_spot_reviewを削除する
    @date_spot_review.destroy

    # 削除した後のdate_spot_reviewsを返す
    @date_spot_reviews = DateSpotReview.where(date_spot_id: date_spot_id).map do |date_spot_review|
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

    # デートスポットの評価の平均値を設定する
    review_rate_total = 0
    DateSpotReview.where(date_spot_id: date_spot_id).each{ |review| review_rate_total+=review.rate}
    review_average_rate = review_rate_total == 0? 0: review_rate_total / DateSpotReview.where(date_spot_id: date_spot_id).length

    render json: { status: :deleted, date_spot_reviews: @date_spot_reviews, review_average_rate: review_average_rate }
  end

  def update
    if @date_spot_review.update(date_spot_review_params)
      @date_spot_reviews = DateSpotReview.where(date_spot_id: @date_spot_review.date_spot_id).map do |date_spot_review|
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

      # デートスポットの評価の平均値を設定する
      review_rate_total = 0
      DateSpotReview.where(date_spot_id: @date_spot_review.date_spot_id).each{ |review| review_rate_total+=review.rate}
      review_average_rate = review_rate_total == 0? 0: review_rate_total / DateSpotReview.where(date_spot_id: @date_spot_review.date_spot_id).length

      render json: {status: :updated, date_spot_reviews: @date_spot_reviews, review_average_rate: review_average_rate }
    else
      render json: { status: 500, error_messages: @date_spot_review.errors.messages }
    end

  end

  private

  def date_spot_review_params
    params.require(:date_spot_review).permit(:rate, :content, :user_id, :date_spot_id)
  end

  def date_spot_review_find_param_id
    @date_spot_review = DateSpotReview.find(params[:id])
  end

end
