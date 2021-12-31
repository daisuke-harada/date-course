class ApplicationController < ActionController::Base
  include SessionsHelper
  include UsersHelper
  include DateSpotReviewsHelper

  helper_method :current_management

  # デートスポットの名前検索の際に使用する
  def set_q_for_date_spot
    @date_spot_search_params = DateSpot.ransack(params[:date_spot_search], search_key: :date_spot_search)
  end

  # ユーザーの名前検索の際に使用する
  def set_q_for_user
    # 同時に１画面で同じパラメータを検索するため、違うパラメータを用意する。
    @user_search_params = User.ransack(params[:q])
  end

  def current_management
   if session[:management_id]
     current_management = Management.find_by(id: session[:management_id])
   else
     current_mangement = Management.create
   end
   session[:management_id] = current_management.id
   current_management
  end

end
