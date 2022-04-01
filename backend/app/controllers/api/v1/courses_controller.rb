class Api::V1::CoursesController < ApplicationController
  def create
    @course = Course.new(course_params)
    if @course.save
      params[:during_spots].map do |during_spot_id|
        DuringSpot.create({course_id: @course.id, date_spot_id: during_spot_id})
      end
      render json: { status: :created, course_id: @course.id}
    end
  end

  def show
    @course = Course.find(params[:id])
  end

  private

  def course_params
    params.require(:course).permit(:user_id, :travel_mode, :authority)
  end

  def during_date_spots(course)
    return course.during_spots.map do |during_spot|
      DateSpot.find(during_spot.date_spot_id)
    end
  end

  def course_info(course)
    return {
      user: User.find(course.user_id),
      travel_mode: course.travel_mode,
      authority: course.authority,
      during_spot: during_date_spots(course)
    }
  end

end
