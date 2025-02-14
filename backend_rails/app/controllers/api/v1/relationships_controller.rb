class Api::V1::RelationshipsController < ApplicationController
  def create
    current_user = User.includes(date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).find(params[:current_user_id])
    followed_user = User.includes(date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).find(params[:followed_user_id])
    following = current_user.follow(followed_user)
    following.save

    users = User.includes(:followers, :followings, date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).non_admins

    render status: :created, json: {
      users: users.map { |user| UserSerializer.new(user).attributes },
      current_user: UserSerializer.new(current_user).attributes,
      followed_user: UserSerializer.new(followed_user).attributes
    }
  end

  def destroy
    current_user = User.includes(date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).find(params[:current_user_id])
    unfollowed_user = User.includes(date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).find(params[:other_user_id])
    unfollowing = current_user.unfollow(unfollowed_user)
    unfollowing.destroy

    users = User.includes(:followers, :followings, date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).non_admins

    render status: :ok, json: {
      users: users.map { |user| UserSerializer.new(user).attributes },
      current_user: UserSerializer.new(current_user).attributes,
      unfollowed_user: UserSerializer.new(unfollowed_user).attributes
    }
  end

  def followings
    user = User.find(params[:user_id])

    followings = user.followings.includes(:followers, :followings, date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).non_admins

    render status: :ok, json: {user_name: user.name, users: followings.map { |user| UserSerializer.new(user).attributes }}
  end

  def followers
    user = User.find(params[:user_id])

    followers = user.followers.includes(:followers, :followings, date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).non_admins

    render status: :ok, json: {user_name: user.name, users: followers.map { |user| UserSerializer.new(user).attributes }}
  end
end
