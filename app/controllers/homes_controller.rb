class HomesController < ApplicationController
  def top
    @areas = Area.all
    @main_prefectures = Prefecture.find([13, 27, 40, 14, 23, 26])
  end
end
