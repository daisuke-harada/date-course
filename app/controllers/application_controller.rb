class ApplicationController < ActionController::Base
  before_action :set_q_for_date_spot
  include SessionsHelper
  include UsersHelper
  
  def set_q_for_date_spot
    @date_spot_search_params = DateSpot.ransack(params[:q])
  end
end
