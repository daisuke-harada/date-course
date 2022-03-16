class Api::V1::RelationshipsController < ApplicationController
  def create
    # フォローするユーザー
    current_user = User.find(params[:current_user_id])
    followed_user = User.find(params[:followed_user_id])
    following = current_user.follow(followed_user)
    following.save
  end

  def destroy
  end

  def followings
  end

  def followers
  end

  private
end
