class CoursesController < ApplicationController
  def my_course
    @management_date_spots = current_management.management_date_spots.includes([:date_spot])
  end

  def update_course
  end

  def delete_course
  end
end
