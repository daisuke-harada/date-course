class Api::V1::RelationshipsController < ApplicationController
  def create
    current_user = User.find(params[:current_user_id])
    followed_user = User.find(params[:followed_user_id])
    following = current_user.follow(followed_user)
    following.save

    users = User.where(admin: false).map do |user|
      user.info_with_following_and_followers_ids
    end

    render json: {
      status: :created,
      users: users,
      current_user: current_user.info_with_following_and_followers_ids,
      followed_user: followed_user.info_with_following_and_followers_ids
    }
  end

  def destroy
    current_user = User.find(params[:current_user_id])
    unfollowed_user = User.find(params[:other_user_id])
    unfollowing = current_user.unfollow(unfollowed_user)
    unfollowing.destroy

    users = User.where(admin: false).map do |user|
      user.info_with_following_and_followers_ids
    end

    render json: {
      status: :deleted,
      users: users,
      current_user: current_user.info_with_following_and_followers_ids,
      unfollowed_user: unfollowed_user.info_with_following_and_followers_ids
    }
  end

  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def followings
    user = User.find(params[:user_id])

    followings = user.followings.map do |following_user|
      following_user.info_with_following_and_followers_ids
    end

    render json: {user_name: user.name, users: followings}
  end

  # TODO: ネストさせてコントローラをわけてもいいかもしれない。action名をCRUD処理の名前にすべき
  def followers
    user = User.find(params[:user_id])

    followers = user.followers.map do |follower|
      follower.info_with_following_and_followers_ids
    end

    render json: {user_name: user.name, users: followers}
  end
end
