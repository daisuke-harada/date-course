class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: %i[show destroy]

  def index
    courses = Course.where(authority: "公開").map {|course| course.info }

    render json: {courses: courses}
  end

  def show
    render json: { course: @course.info }
  end

  def create
    @course = Course.new(course_params)

    if @course.save
      params[:during_spots].each do |during_spot_id|
        @course.during_spots.create(date_spot_id: during_spot_id)
      end
      render json: { status: :created, course_id: @course.id }
    else
      render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @course.destroy
    render json: { status: :deleted }
  end

  private

  def course_params
    params.require(:course).permit(:user_id, :travel_mode, :authority)
  end

  def set_course
    @course = Course.find(params[:id])
  end
end
