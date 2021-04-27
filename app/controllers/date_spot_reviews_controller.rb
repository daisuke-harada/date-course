class DateSpotReviewsController < ApplicationController
  before_action :date_spot_review_find_param_id, only: [:edit, :update, :destroy]
  before_action :logged_in_general_user,         only: [:new, :edit, :create, :update, :destroy]
  before_action :correct_user,                   only: [:edit, :update, :destroy]

  def new
    @date_spot_review = DateSpotReview.new(date_spot_id: params[:date_spot_id], user_id: current_user.id)
  end

  def create
    @date_spot_review = DateSpotReview.new(date_spot_review_params)
    if @date_spot_review.save
      flash[:success] = "投稿しました"
      redirect_to @date_spot_review.date_spot
    else
      flash[:danger] = "投稿できませんでした"
      render 'new'
    end
  end

  def edit
  end

  def update
    if @date_spot_review.update(date_spot_review_params)
      flash[:success] = "レビューを更新しました"
      redirect_to @date_spot_review.date_spot
    else
      flash[:danger] = "レビューを更新できませんでした"
      render 'edit'
    end
  end

  def destroy
    @date_spot_review.destroy
    flash[:sucess] = "レビューを削除しました"
    redirect_to @date_spot_review.date_spot
  end

  private
    def date_spot_review_find_param_id
      @date_spot_review = DateSpotReview.find(params[:id])
    end

    def date_spot_review_params
      params.require(:date_spot_review).permit(:rate, :content, :user_id, :date_spot_id)
    end

    def logged_in_general_user
      if logged_in? && current_user.admin == true
        flash[:danger] = "一般ステータスのアカウントでログインしてください"
        redirect_to login_url
      elsif !logged_in?
        flash[:danger] = "ログインしてください"
        redirect_to login_url
      end
    end

    # そのアカウントを持っている人以外がアクセスすることを防ぐ
    def correct_user
      date_spot_review = DateSpotReview.find(params[:id])
      redirect_to(root_url) unless date_spot_review.user == current_user 
    end
end
