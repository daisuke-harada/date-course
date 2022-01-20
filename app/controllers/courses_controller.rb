class CoursesController < ApplicationController
  def confirm
    @management_date_spots = current_management.management_date_spots

    # 追加されたデートスポットの住所モデルが登録されている配列を作成
    @date_spot_addresses = create_array_address_date_spot(@management_date_spots)

    @course = Course.new(user_id: params[:user_id], scheduled_time: params[:scheduled_time], authority: params[:authority])
  end
  
  def show
  end

  def edit
  end

  def index
  end

  def create
    binding.pry
  end

  def update
  end

  def destroy
  end
end
