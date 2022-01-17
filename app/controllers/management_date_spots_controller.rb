class ManagementDateSpotsController < ApplicationController
  before_action :set_management_date_spot, only: [:add_course, :delete_course]

  def my_course
    @management_date_spots = current_management.management_date_spots
    # 追加されたデートスポットの住所モデルが登録されている配列を作成
    @date_spot_addresses = []

    # 追加されたデートスポットモデルが登録されている配列を追加された数だけ作成
    @date_spot_names = Array.new(@management_date_spots.count);
    
    # 追加されたデートスポットの数だけ、名前の配列を用意する。なぜなら、デートスポットによって配列の中身が違うからです。
    for num in 0..(@management_date_spots.count - 1) do
      @date_spot_names[num] = []
      @management_date_spots.each do |management_date_spot|
        @date_spot_names[num].push(management_date_spot.date_spot.name)
      end
    end

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

  def change_course
    # 入れ替える元の配列
    original_arrangement_number = 0

    # 入れ替える対象の配列
    change_arrangement_number = 0
    count = 0
    change_id = 0
    original_id = params[:original_id].to_i
    # 名前が同じ場合に入れ替える対象の配列や、入れ替える元の配列の番号を設定する
    current_management.management_date_spots.each do |management_date_spot|
      if management_date_spot.date_spot.id == params[:original_id]
        original_arrangement_number = count
      end

      if management_date_spot.date_spot.name == params[:change_name]
        change_arrangement_number = count
        change_id = management_date_spot.date_spot.id
      end

      count += 1
    end
    
    # デートスポットのIDをいれかえて、更新する。
    current_management.management_date_spots[original_arrangement_number].update(date_spot_id: change_id)
    current_management.management_date_spots[change_arrangement_number].update(date_spot_id: original_id)

    @management_date_spots = current_management.management_date_spots
    redirect_to my_course_path
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
