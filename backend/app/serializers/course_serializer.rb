class CourseSerializer < ActiveModel::Serializer
  belongs_to :user

  attributes :id, :authority, :travel_mode, :user, :course_during_spots, :no_duplicate_prefecture_names

  attribute :course_during_spots do
    object.during_spots.map do |during_spot|
      Address.find_by(date_spot_id: during_spot.date_spot_id).combined_data_with_address_and_genre
    end
  end

  attribute :no_duplicate_prefecture_names do
    prefecture_ids = Address.where(date_spot_id: object.date_spots.pluck(:id)).pluck(:prefecture_id)
    # 県名の重複をなくして返す
    Prefecture.where(id: prefecture_ids).pluck(:name).uniq
  end
end
