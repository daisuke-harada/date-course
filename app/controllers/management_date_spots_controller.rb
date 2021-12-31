class ManagementDateSpotsController < ApplicationController
  before_action :set_management_date_spot, only: [:add_course, :delete_course]

  def my_course
    @management_date_spots = current_management.management_date_spots
  end

  def add_course
    unless logged_in?
      flash[:danger] = 'ログインしてください'
      return redirect_to login_path
    end

    @management_date_spot ||= current_management.management_date_spots.build(date_spot_id: params[:date_spot_id])
    if @management_date_spot.save
      redirect_to my_course_path
    else
      redirect_to date_spot_url(params[:date_spot_id])
    end
  end

  def delete_course
    if @management_date_spot.destroy
      flash[:success] = 'デートコースからデートスポットが削除されました'
    else
      flash[:danger] = '削除に失敗しました'
    end
    redirect_to my_course_path
  end

  private

  def set_management_date_spot
    @management_date_spot = current_management.management_date_spots.find_by(date_spot_id: params[:date_spot_id])
  end
end
