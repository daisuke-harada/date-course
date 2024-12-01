class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: %i[show destroy]

  def index
    courses = Course.includes(date_spots: {address: {date_spot: :date_spot_reviews}}, user: [:followers, :followings]).where(authority: "公開")
    render json: courses
  end

  def show
    render json: @course
  end

  def create
    course_form = CourseForm.new(course_params)
    if course_form.save
      render json: {status: :created, course_id: course_form.id}
    else
      render json: ErrorSerializer.new(course).as_json, status: :unprocessable_entity
    end
  end

  def destroy
    @course.destroy
    render json: {status: :deleted}
  end

  private

  def course_params
    params.require(:course).permit(:user_id, :travel_mode, :authority, date_spots: [])
  end

  def set_course
    @course = Course.includes(date_spots: {address: {date_spot: :date_spot_reviews}}, user: [:followers, :followings]).find(params[:id])
  end
end
