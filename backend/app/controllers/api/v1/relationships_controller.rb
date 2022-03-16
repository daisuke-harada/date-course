class Api::V1::RelationshipsController < ApplicationController
  def create
    # フォローするユーザー
    current_user = User.find(params[:current_user_id])
    followed_user = User.find(params[:followed_user_id])
    binding.pry
    following = current_user.follow(followed_user)
    binding.pry
    following.save
    binding.pry
  end

  def destroy
  end

  def followings
  end

  def followers
  end

  private
end
