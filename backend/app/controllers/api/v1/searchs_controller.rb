class Api::V1::SearchsController < ApplicationController
  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def date_spot_sort_search
    # genreとprefectureの検索を行う
    genre_prefecture_result = DateSpot.includes(:address).ransack(address_prefecture_id_eq: params[:prefecture_id], genre_id_eq: params[:genre_id]).result

    # デートスポットの営業開始時刻がcome_timeの時刻より、早い時刻を検索する。
    opening_time_search = genre_prefecture_result.ransack(opening_time_lteq: params[:come_time]).result

    # opening_time_searchの検索結果からデートスポットの営業終了時刻がcome_timeの時刻より、遅い時刻を検索する
    date_spot_search_params_decided = opening_time_search.ransack(closing_time_gteq: params[:come_time]).result

    address_and_date_spots = date_spot_search_params_decided.map do |date_spot|
      AddressSerializer.new(date_spot.address)
    end

    render json: {status: "success", address_and_date_spots: address_and_date_spots, prefecture_id: params[:prefecture_id], genre_id: params[:genre_id], come_time: params[:come_time]}
  end

  def course_sort_search
    during_spots = DuringSpot.includes(date_spot: :address).ransack(date_spot_address_prefecture_id_eq: params[:prefecture_id]).result
    course_ids = during_spots.pluck(:course_id)
    courses = Course.where(id: course_ids.uniq)

    render json: {courses: courses.map { |course| CourseSerializer.new(course).attributes }, prefecture_id: params[:prefecture_id], status: "success"}
  end

  def user_name_search
    users = User.ransack(name_cont: params[:user_name]).result
    render json: users
  end

  def date_spot_name_search
    date_spots = DateSpot.ransack(name_cont: params[:date_spot_name]).result
    address_and_date_spots = date_spots.map { |date_spot| AddressSerializer.new(date_spot.address) }

    render json: {address_and_date_spots: address_and_date_spots}
  end
end
