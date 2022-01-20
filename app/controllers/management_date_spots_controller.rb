class ManagementDateSpotsController < ApplicationController
  before_action :set_management_date_spot, only: [:add_course, :delete_course]

  def my_course
    @management_date_spots = current_management.management_date_spots
    
    # 追加されたデートスポットの住所モデルが登録されている配列を作成
    @date_spot_addresses = create_array_address_date_spot(@management_date_spots)

    # 追加されたデートスポットモデルが登録されている配列を追加された数だけ作成する。
    @date_spot_names = create_array_date_spot_name(@management_date_spots)

    # デートコース作成画面のラジオボタンの初期値を挿入する。
    unless session[:authority_false]
      session[:authority_true] = true
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
      return redirect_to request.referer
    end


    @management_date_spot ||= current_management.management_date_spots.build(date_spot_id: params[:date_spot_id])
    if @management_date_spot.save
      redirect_to my_course_path
    else
      redirect_to date_spot_url(params[:date_spot_id])
    end
  end

  def change_course
    @management_date_spots = current_management.management_date_spots

    # 元の配列を指定するための番号を入れるための変数
    original_array_number = 0

    # 入れ替える対象の配列を指定するための番号を入れるための変数
    change_array_number = 0

    count = 0
    change_id = 0
    original_id = params[:original_id].to_i

    # 入れ替え元の配列の番号を設定するために繰り返し処理を行う。
    @management_date_spots.each do |management_date_spot|
      if management_date_spot.date_spot_id == original_id
        original_array_number = count
      end

      if management_date_spot.date_spot.name == params[:change_name]
        change_array_number = count
        change_id = management_date_spot.date_spot_id
      end

      count += 1
    end
    
    # デートスポットのIDをいれかえて、更新する。
    # 元の配列のデートスポットのIDを入れ替えたいIDに変更することで入れ替える。
    @management_date_spots[original_array_number].update(date_spot_id: change_id)

    # 入れ替えたい番号の配列に元のデートスポットのIDに変更することで入れ替える。
    @management_date_spots[change_array_number].update(date_spot_id: original_id)

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
