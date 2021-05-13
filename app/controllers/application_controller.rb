class ApplicationController < ActionController::Base
  include SessionsHelper
  include UsersHelper
  
  #デートスポットの名前検索の際に使用する
  def set_q_for_date_spot
    @date_spot_search_params = DateSpot.ransack(params[:q])
  end

  #ユーザーの名前検索の際に使用する
  def set_q_for_user
    @user_search_params = User.ransack(params[:q])
  end
end
