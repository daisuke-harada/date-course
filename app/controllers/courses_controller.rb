class CoursesController < ApplicationController
  before_action :course_find_param_id, only: [:show, :edit, :update, :destroy]
  before_action :set_q_for_date_spot
  before_action :set_q_for_user

  def confirm
    @management_date_spots = current_management.management_date_spots

    # 追加されたデートスポットの住所モデルが登録されている配列を作成
    @date_spot_addresses = create_array_address_date_spot(@management_date_spots)

    @course = Course.new(user_id: current_user.id, scheduled_time: params[:scheduled_time], authority: params[:authority])

    session[:scheduled_time] = params[:scheduled_time]
    if params[:authority] == "false"
      session[:authority_false] = true
      session.delete(:authority_true)
    else
      session[:authority_true] = true
      session.delete(:authority_false)
    end
  end
  
  def show
    @information_courses = InformationCourse.where(course_id: @course.id)
    # 追加されたデートスポットの住所モデルが登録されている配列を作成
    @date_spot_addresses = create_array_address_date_spot(@information_courses)
  end

  def edit
    @information_courses = InformationCourse.where(course_id: @course.id)

    # 追加されたデートスポットの住所モデルが登録されている配列を作成
    @date_spot_addresses = create_array_address_date_spot(@information_courses)

    # 追加されたデートスポットモデルが登録されている配列を追加された数だけ作成する。
    @date_spot_names = create_array_date_spot_name(@information_courses)
  end

  def index
    @courses = Course.where(authority: true)
  end

  def create
    @course = Course.new(user_id: params[:user_id], scheduled_time: params[:scheduled_time], traffic_mode: current_management.traffic_mode, authority: params[:authority])
    
    if @course.save
      
      @management_date_spots = current_management.management_date_spots

      # information_coursesにデートスポットを登録する。
      for array in 0..(@management_date_spots.count - 1) do
        InformationCourse.create(course_id: @course.id,
          date_spot_id: @management_date_spots[array].date_spot_id)
      end

      current_management.destroy
      session.delete(:management_id)
      session.delete(:scheduled_time)
      session.delete(:authority_true) if params[:authority] == "true"
      session.delete(:authority_false) if params[:authority] == "false"
      
      flash[:success] = "デートコースの登録が完了しました"
      redirect_to course_path(@course.id)
    else
      flash[:danger] = "デートコースの登録に失敗しました"
      render 'confirm'
    end
    
  end

  def update
  end

  def change_information_course
    @information_courses = InformationCourse.where(course_id: params[:course_id])

    # 元の配列を指定するための番号を入れるための変数
    original_array_number = 0

    # 入れ替える対象の配列を指定するための番号を入れるための変数
    change_array_number = 0

    count = 0
    change_id = 0
    original_id = params[:original_id].to_i

    # 入れ替え元の配列の番号を設定するために繰り返し処理を行う。
    @information_courses.each do |information_course|
      if information_course.date_spot_id == original_id
        original_array_number = count
      end

      if information_course.date_spot.name == params[:change_name]
        change_array_number = count
        change_id = information_course.date_spot_id
      end

      count += 1
    end
    
    # デートスポットのIDをいれかえて、更新する。
    # 元の配列のデートスポットのIDを入れ替えたいIDに変更することで入れ替える。
    @information_courses[original_array_number].update(date_spot_id: change_id)

    # 入れ替えたい番号の配列に元のデートスポットのIDに変更することで入れ替える。
    @information_courses[change_array_number].update(date_spot_id: original_id)

    redirect_to edit_course_path(params[:course_id])
  end

  def delete_information_course
    @information_courses = InformationCourse.where(course_id: params[:id])
    @information_course = @information_courses.find_by(date_spot_id: params[:date_spot_id])

    if @information_course.destroy
      flash[:success] = "デートコースから#{@information_course.date_spot.name}が削除されました"
    else
      flash[:danger] = '削除に失敗しました'
    end
    redirect_to edit_course_path(params[:id])
  end

  def destroy
    if @course.destroy
      flash[:success] = "デートコースがすべて削除されました"
    else
      flash[:danger] = '削除に失敗しました'
    end

    redirect_to user_path(@course.user_id)
  end

  private

  def course_find_param_id
    @course = Course.find(params[:id])
  end

end
