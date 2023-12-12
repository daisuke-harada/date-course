# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE)
#  email           :string(255)
#  gender          :string(255)
#  image           :string(255)
#  name            :string(255)
#  password_digest :string(255)
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
    object.followers.ids
  end

  attribute :followingIds do
    object.followings.ids
  end
end
