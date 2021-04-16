class DateSpotsController < ApplicationController
  def new
    @date_spot = DateSpot.new
    @date_spot.build_address
    @prefectures = Prefecture.all
  end

  def create

  end

  def show
  end

  def edit
  end

  def index
  end
end
