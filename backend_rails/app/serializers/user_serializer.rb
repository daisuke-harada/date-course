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
  has_many :courses

  attributes :id, :admin, :email, :gender, :image, :name, :followerIds, :followingIds

  attribute :followerIds do
    object.followers.pluck(:id)
  end

  attribute :followingIds do
    object.followings.pluck(:id)
  end
end
