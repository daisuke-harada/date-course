class HomesController < ApplicationController
  before_action :set_q_for_date_spot
  before_action :set_q_for_user

  def top
    @areas = Area.all
    @main_prefectures = Prefecture.find([13, 27, 40, 14, 23, 26])
    @main_genres = Genre.find([1, 2, 3, 4, 5, 6])
  end
end
