class ManagementsController < ApplicationController
  def update
    if current_user.management.update(management_params)
      flash[:success] = "交通手段を変更しました"
      redirect_to my_course_path
    else
      redirect_to my_course_path
    end
  end

  private

  def management_params
    params.require(:management).permit(
      :id, :user_id,
      :traffic_mode
    )
  end

end
