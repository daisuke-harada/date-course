class ApplicationController < ActionController::Base
  include SessionsHelper
  include UsersHelper
  
  def set_q_for_date_spot
    @date_spot_search_params = DateSpot.ransack(params[:q])
  end

  def set_q_for_user
    @user_search_params = User.ransack(params[:q])
  end
end
