class FilterController < ApplicationController
  before_action :set_q_for_date_spot
  before_action :set_q_for_user

  def search
    @select_search_target = params[:select_search_target]
    
    if @select_search_target == "User"
      @user_custom_search_params = User.ransack(name_cont: params[:search_name])
      @users = @user_custom_search_params.result
      render template: "users/index"
    else
      @date_spot_custom_search_params = DateSpot.ransack(name_cont: params[:search_name])
      @date_spots = @date_spot_custom_search_params.result
      render template: "date_spots/index"
    end
  end

  private

  #デートスポットの名前検索の際に使用する
  def set_q_for_date_spot
    @date_spot_search_params = DateSpot.ransack(params[:date_spot_search], search_key: :date_spot_search)
  end

  #ユーザーの名前検索の際に使用する
  def set_q_for_user
    # 同時に１画面で同じパラメータを検索するため、違うパラメータを用意する。
    @user_search_params = User.ransack(params[:q])
  end
end
