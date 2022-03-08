class Api::V1::DateSpotsController < ApplicationController
  def new
    @areas = Area.all
    @prefectures = Prefecture.all
    render json: { areas: @areas, prefectures: @prefectures}
  end

  def create
  end

  def update
  end

  def destroy
  end

  def show
  end

  def index
  end
end
