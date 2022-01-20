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
    @course = Course.new(user_id: params[:user_id], scheduled_time: params[:scheduled_time], authority: params[:authority])
    if @course.save
      
      @management_date_spots = current_management.management_date_spots

      # information_coursesにデートスポットを登録する。
      for array in 0..(@management_date_spots.count - 1) do
        InformationCourse.create(course_id: @course.id,
          date_spot_id: @management_date_spots[array].date_spot_id,
          position: array + 1)
      end

      current_management.destroy
      session.delete(:management_id)
      
      binding.pry
      flash[:success] = "デートコースの登録が完了しました"
      redirect_to users_path(params[:user_id])
    else
      flash[:danger] = "デートコースの登録に失敗しました"
      render 'confirm'
    end
    
  end

  def update
  end

  def destroy
  end
end
