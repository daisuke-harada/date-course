class Api::V1::SearchsController < ApplicationController
  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def date_spot_sort_search
    # デートスポットの営業開始時刻がcome_timeの時刻より、早い時刻を検索する。
    date_spot_search_params_decided = DateSpot.includes(:address, :date_spot_reviews)
      .ransack(address_prefecture_id_eq: params[:prefecture_id],
        genre_id_eq: params[:genre_id],
        opening_time_lteq: params[:come_time],
        closing_time_gteq: params[:come_time])
      .result

    address_and_date_spots = date_spot_search_params_decided.map { |date_spot| AddressSerializer.new(date_spot.address) }

    render status: :ok, json: {address_and_date_spots: address_and_date_spots, prefecture_id: params[:prefecture_id], genre_id: params[:genre_id], come_time: params[:come_time]}
  end

  def course_sort_search
    course_ids = DuringSpot.includes(date_spot: :address).ransack(date_spot_address_prefecture_id_eq: params[:prefecture_id]).result.pluck(:course_id).uniq
    courses = Course.includes(date_spots: {address: {date_spot: :date_spot_reviews}}, user: [:followers, :followings]).where(id: course_ids)
    render status: :ok, json: {courses: courses.map { |course| CourseSerializer.new(course).attributes }, prefecture_id: params[:prefecture_id]}
  end

  def user_name_search
    users = User.includes(:followers, :followings, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).ransack(name_cont: params[:user_name]).result
    render status: :ok, json: users
  end

  def date_spot_name_search
    date_spots = DateSpot.includes(:address, :date_spot_reviews).ransack(name_cont: params[:date_spot_name]).result
    address_and_date_spots = date_spots.map { |date_spot| AddressSerializer.new(date_spot.address) }

    render status: :ok, json: {address_and_date_spots: address_and_date_spots}
  end
end
