class Api::V1::RelationshipsController < ApplicationController
  def create
    current_user = User.find(params[:current_user_id])
    followed_user = User.find(params[:followed_user_id])
    following = current_user.follow(followed_user)
    following.save

    users = User.where(admin: false)

    render json: {
      status: :created,
      users: ActiveModelSerializers::SerializableResource.new(users, each_serializer: UserSerializer),
      current_user: ActiveModelSerializers::SerializableResource.new(current_user, serializer: UserSerializer),
      followed_user: ActiveModelSerializers::SerializableResource.new(followed_user, serializer: UserSerializer)
    }
  end

  def destroy
    current_user = User.find(params[:current_user_id])
    unfollowed_user = User.find(params[:other_user_id])
    unfollowing = current_user.unfollow(unfollowed_user)
    unfollowing.destroy

    users = User.where(admin: false)

    render json: {
      status: :deleted,
      users: ActiveModelSerializers::SerializableResource.new(users, each_serializer: UserSerializer),
      current_user: ActiveModelSerializers::SerializableResource.new(current_user, serializer: UserSerializer),
      unfollowed_user: ActiveModelSerializers::SerializableResource.new(un_followed_user, serializer: UserSerializer)
    }
  end

  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def followings
    user = User.find(params[:user_id])

    followings = user.followings

    render json: {user_name: user.name, users: ActiveModelSerializers::SerializableResource.new(followings, each_serializer: UserSerializer)}
  end

  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def followers
    user = User.find(params[:user_id])

    followers = user.followers

    render json: {user_name: user.name, users: ActiveModelSerializers::SerializableResource.new(followers, each_serializer: UserSerializer)}
  end
end
