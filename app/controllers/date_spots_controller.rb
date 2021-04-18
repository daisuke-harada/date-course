class DateSpotsController < ApplicationController
  def new
    @date_spot = DateSpot.new
    @date_spot.build_address
  end

  def create
    @date_spot = DateSpot.create(date_spot_params)
    if @date_spot.save
      flash[:success] = "デートスポットの登録が完了しました"
      redirect_to @date_spot
    else
      render 'new'
    end
  end

  def show
    @date_spot = DateSpot.find(params[:id])
  end

  def edit
  end

  def index
  end

  private
    def date_spot_params
      params.require(:date_spot).permit(
        :name,:opening_time,
        :closing_time,
        :image,
        address_attributes: [:prefecture_id,
                             :city_name]
        )
    end
end
