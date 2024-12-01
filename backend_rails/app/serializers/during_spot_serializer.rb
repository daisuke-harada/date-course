# == Schema Information
#
# Table name: during_spots
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  course_id    :bigint           not null
#  date_spot_id :bigint           not null
#
# Indexes
#
#  index_during_spots_on_course_id     (course_id)
#  index_during_spots_on_date_spot_id  (date_spot_id)
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#  fk_rails_...  (date_spot_id => date_spots.id)
#
class DuringSpotSerializer < ActiveModel::Serializer
  attributes :id, :closing_time, :image, :name, :opening_time, :genre_id
end
