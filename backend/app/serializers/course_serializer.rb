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
  has_many :during_spots
  has_many :date_spots, through: :during_spots

  attributes :id, :authority, :travel_mode, :user, :no_duplicate_prefecture_names

  attribute :no_duplicate_prefecture_names do
    # during_spots を通じて date_spots にアクセス
    prefecture_ids = object.during_spots.map { |during_spot| during_spot.date_spot.address.prefecture_id }.uniq
    # 県名の重複をなくして返す
    Prefecture.where(id: prefecture_ids).pluck(:name).uniq
  end
end
