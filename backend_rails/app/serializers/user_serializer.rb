# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE)
#  email           :string
#  gender          :string
#  image           :string
#  name            :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#  index_users_on_name   (name) UNIQUE
#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :admin, :email, :gender, :image, :name, :followerIds, :followingIds

  attribute :courses do
    object.courses.map { |course| CourseSerializer.new(course) }
  end

  attribute :date_spot_reviews do
    object.date_spot_reviews.map { |review| {id: review.id, rate: review.rate, content: review.content, date_spot: review.date_spot} }
  end

  attribute :followerIds do
    object.followers.pluck(:id)
  end

  attribute :followingIds do
    object.followings.pluck(:id)
  end
end
