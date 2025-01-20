class Api::V1::RelationshipsController < ApplicationController
  def create
    current_user = User.find(params[:current_user_id])
    followed_user = User.find(params[:followed_user_id])
    following = current_user.follow(followed_user)
    following.save

    users = User.non_admins

    render status: :created, json: {
      users: users.map { |user| UserSerializer.new(user).attributes },
      current_user: UserSerializer.new(current_user).attributes,
      followed_user: UserSerializer.new(followed_user).attributes
    }
  end

  def destroy
    current_user = User.find(params[:current_user_id])
    unfollowed_user = User.find(params[:other_user_id])
    unfollowing = current_user.unfollow(unfollowed_user)
    unfollowing.destroy

    users = User.non_admins

    render status: :ok, json: {
      users: users.map { |user| UserSerializer.new(user).attributes },
      current_user: UserSerializer.new(current_user).attributes,
      unfollowed_user: UserSerializer.new(unfollowed_user).attributes
    }
  end

  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def followings
    user = User.find(params[:user_id])

    followings = user.followings

    render status: :ok, json: {user_name: user.name, users: followings.map { |user| UserSerializer.new(user).attributes }}
  end

  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def followers
    user = User.find(params[:user_id])

    followers = user.followers

    render status: :ok, json: {user_name: user.name, users: followers.map { |user| UserSerializer.new(user).attributes }}
  end
end
