class DateSpotsController < ApplicationController
  before_action :logged_in_admin,         only: [:new, :create, :edit, :update, :destroy]
  before_action :date_spot_find_param_id, only: [:show, :edit, :update, :destroy]
  before_action :set_q_for_date_spot
  before_action :set_q_for_user

  def new
    @date_spot = DateSpot.new
    @date_spot.build_address
  end

  def create
    @date_spot = DateSpot.create(date_spot_params)
    if @date_spot.save
      flash[:success] = "デートスポットの登録が完了しました"
      redirect_to @date_spot
    else
      render 'new'
    end
  end

  def show

    rate_total_value = 0
    @date_spot.date_spot_reviews.each do |date_spot_review|
      rate_total_value += date_spot_review.rate
    end
    
    # 何もレビューされておらず、評価がゼロの際にはZeroDivisionError(整数に対して整数の 0 で除算を行ったときに発生します。)が発生するため、条件演算子で回避する。
    @date_spot_reviews_rate_average = @date_spot.date_spot_reviews.count > 0 ? rate_total_value / @date_spot.date_spot_reviews.count : 0

    # デートスポットのレビューをすべて表示する際に、先頭に自分がレビューしたレビューが来るようにする。
    if current_user && @date_spot.date_spot_reviews.where(user_id: current_user.id)
      @current_user_date_spot_review = @date_spot.date_spot_reviews.find_by(user_id: current_user.id)
      @reviews = @date_spot.date_spot_reviews.where.not(user_id: current_user.id)
    else
      @reviews = @date_spot.date_spot_reviews
    end
  end

  def edit
  end

  def update
    if @date_spot.update(date_spot_params)
      flash[:success] = "デートスポット情報の更新が完了しました"
      redirect_to @date_spot
    else
      render 'edit'
    end
  end

  def destroy
    @date_spot.destroy
    flash[:success] = "デートスポットを削除しました"
    redirect_to date_spots_path
  end

  def index
    date_spot_search_params_decided = @date_spot_search_params.result.ransack(closing_time_gteq: @date_spot_search_params.opening_time_lteq)
    @date_spots = date_spot_search_params_decided.result
  end

  private
    def date_spot_params
      params.require(:date_spot).permit(
        :name, :genre_id,
        :opening_time,
        :closing_time,
        :image,
        address_attributes: [:prefecture_id,
                             :city_name]
        )
    end

    def date_spot_find_param_id
      @date_spot = DateSpot.find(params[:id])
    end

    def logged_in_admin
      unless admin_logged_in?
        if logged_in?
          log_out
        end
        flash[:danger] = "管理者権限を持つアカウントでログインしてください"
        redirect_to login_url
      end
    end
end
