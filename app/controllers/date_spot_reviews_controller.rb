class DateSpotReviewsController < ApplicationController
  def new
    date_spot = DateSpot.find(param[:id)
    @date_spot_review = DateSpotRevew.new(date_spot_id: date_spot.id)
  end

  def edit
  end
end
