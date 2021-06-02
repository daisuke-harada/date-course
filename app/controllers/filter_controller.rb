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
      binding.pry
      render template: "date_spots/index"
    end
  end
end
