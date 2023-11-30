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
