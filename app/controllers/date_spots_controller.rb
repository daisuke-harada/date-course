class DateSpotsController < ApplicationController
  before_action :logged_in_admin,         only: [:new, :create, :edit, :update, :destroy]
  before_action :date_spot_find_param_id, only: [:show, :edit, :update, :destroy]

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
    @date_spots = DateSpot.all
  end

  private
    def date_spot_params
      params.require(:date_spot).permit(
        :name,:opening_time,
        :genre_id,
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
