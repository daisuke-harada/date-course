class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: %i[show destroy]

  def index
    courses = Course.includes(date_spots: {address: {date_spot: :date_spot_reviews}}, user: [:followers, :followings]).where(authority: "公開")
    render status: :ok, json: courses
  end

  def show
    render status: :ok, json: @course
  end

  def create
    course_form = CourseForm.new(course_params)
    if course_form.save
      render status: :created, json: {course_id: course_form.id}
    else
      render status: :unprocessable_entity, json: ErrorSerializer.new(course_form).as_json, status: :unprocessable_entity
    end
  end

  def destroy
    @course.destroy
    render status: :no_content
  end

  private

  def course_params
    params.require(:course).permit(:user_id, :travel_mode, :authority, date_spots: [])
  end

  def set_course
    @course = Course.includes(date_spots: {address: {date_spot: :date_spot_reviews}}, user: [:followers, :followings]).find(params[:id])
  end
end
