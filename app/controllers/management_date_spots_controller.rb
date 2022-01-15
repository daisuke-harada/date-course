class ManagementDateSpotsController < ApplicationController
  before_action :set_management_date_spot, only: [:add_course, :delete_course]

  def my_course
    @management_date_spots = current_management.management_date_spots
    
    # 追加されたデートスポットの住所モデルが登録されている配列を作成
    @date_spot_addresses = []
    @management_date_spots.each do |management_date_spot|
      @date_spot_addresses.push(management_date_spot.date_spot.address)
    end
  end

  def add_course
    # ログインしてない場合には処理ができないようにする。
    if !logged_in?
      flash[:danger] = 'ログインしてください'
      return redirect_to login_path
    end

    if current_management.management_date_spots.find_by(date_spot_id: params[:date_spot_id])
      flash[:danger] = 'このデートスポットはすでに追加されています'
      return redirect_to root_path
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
      flash[:success] = "デートコースから#{@management_date_spot.date_spot.name}が削除されました"
    else
      flash[:danger] = '削除に失敗しました'
    end
    redirect_to my_course_path
  end

  def all_delete_date_spots
    if current_management.management_date_spots.destroy_all
      session.delete(:management_id)
      flash[:success] = "デートコースからデートスポットを全て削除しました。"
    else
      flash[:danger] = "デートコースからデートスポットを全て削除するのに失敗しました。"
    end
    redirect_to my_course_path
  end

  private

  def set_management_date_spot
    @management_date_spot = current_management.management_date_spots.find_by(date_spot_id: params[:date_spot_id])
  end
end
