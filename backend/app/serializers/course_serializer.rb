# == Schema Information
#
# Table name: courses
#
#  id          :bigint           not null, primary key
#  authority   :string(255)      not null
#  travel_mode :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_courses_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class CourseSerializer < ActiveModel::Serializer
  belongs_to :user

  attributes :id, :authority, :travel_mode, :user, :course_during_spots, :no_duplicate_prefecture_names

  attribute :course_during_spots do
    object.during_spots.map do |during_spot|
      AddressSerializer.new(Address.find_by(date_spot_id: during_spot.date_spot_id))
    end
  end

  attribute :no_duplicate_prefecture_names do
    prefecture_ids = Address.where(date_spot_id: object.date_spots.pluck(:id)).pluck(:prefecture_id)
    # 県名の重複をなくして返す
    Prefecture.where(id: prefecture_ids).pluck(:name).uniq
  end
end
