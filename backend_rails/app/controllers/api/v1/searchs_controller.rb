class Api::V1::SearchsController < ApplicationController
  def course_sort_search
    course_ids = DuringSpot.includes(date_spot: :address).ransack(date_spot_address_prefecture_id_eq: params[:prefecture_id]).result.pluck(:course_id).uniq
    courses = Course.includes(date_spots: {address: {date_spot: :date_spot_reviews}}, user: [:followers, :followings]).where(id: course_ids)
    render status: :ok, json: {courses: courses.map { |course| CourseSerializer.new(course).attributes }, prefecture_id: params[:prefecture_id]}
  end

  def user_name_search
    users = User.includes(:followers, :followings, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).ransack(name_cont: params[:user_name]).result
    render status: :ok, json: users
  end
end
