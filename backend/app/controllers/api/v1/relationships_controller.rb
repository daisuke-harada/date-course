class Api::V1::RelationshipsController < ApplicationController
  def create
    current_user = User.find(params[:current_user_id])
    followed_user = User.find(params[:followed_user_id])
    following = current_user.follow(followed_user)
    following.save

    users = User.where(admin: false)
    @users = users.map do |user|
      user_and_userFollowingsAndFollowers(user)
    end

    render json: {
      status: :created,
      users: @users,
      current_user: user_and_userFollowingsAndFollowers(User.find(params[:current_user_id])),
      followed_user: user_and_userFollowingsAndFollowers(User.find(params[:followed_user_id]))
    }
  end

  def destroy
    current_user = User.find(params[:current_user_id])
    unfollowed_user = User.find(params[:other_user_id])
    unfollowing = current_user.unfollow(unfollowed_user)
    unfollowing.destroy
    users = User.where(admin: false)
    @users = users.map do |user|
      user_and_userFollowingsAndFollowers(user)
    end
    render json: {
      status: :deleted,
      users: @users,
      current_user: user_and_userFollowingsAndFollowers(User.find(params[:current_user_id])),
      unfollowed_user: user_and_userFollowingsAndFollowers(User.find(params[:other_user_id]))
    }
  end

  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def followings
    users = User.find(params[:user_id]).followings
    @users = users.map do |user|
      user_and_userFollowingsAndFollowers(user)
    end
    render json: { user_name: User.find(params[:user_id]).name, users: @users}
  end

  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def followers
    users = User.find(params[:user_id]).followers
    @users = users.map do |user|
      user_and_userFollowingsAndFollowers(user)
    end
    render json: { user_name: User.find(params[:user_id]).name, users: @users}
  end
end
