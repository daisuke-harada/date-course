class CourseForm
  include ActiveModel::Model

  attr_accessor :id, :user_id, :travel_mode, :authority, :date_spots
  validates :user_id, :authority, :travel_mode, :date_spots, presence: true

  def save
    return false unless valid?
    return false if date_spots.empty?
    ActiveRecord::Base.transaction do
      course = Course.new(course_attributes)
      date_spots.each do |date_spot_id|
        course.during_spots.build(date_spot_id: date_spot_id)
      end
      course.save!
      self.id = course.id
    end
    true
  rescue ActiveRecord::RecordInvalid
    false
  end

  private

  def course_attributes
    {
      user_id: user_id,
      travel_mode: travel_mode,
      authority: authority
    }
  end
end
