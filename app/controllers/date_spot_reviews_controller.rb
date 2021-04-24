class DateSpotReviewsController < ApplicationController
  before_action :logged_in_general_user, only: [:new, :edit, :update, :destroy]
  before_action :correct_user,           only: [:edit, :update, :destroy]

  def new
    @date_spot_review = DateSpotReview.new(date_spot_id: params[:id])
  end

  def edit
  end

  private

    def logged_in_general_user
      if logged_in? && current_user.admin == true
        store_location
        flash[:danger] = "一般ステータスのアカウントでログインしてください"
        redirect_to login_url
      elsif !logged_in?
        store_location
        flash[:danger] = "ログインしてください"
        redirect_to login_url
      end
    end

    # そのアカウントを持っている人以外がアクセスすることを防ぐ
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless @user == current_user 
    end
end
