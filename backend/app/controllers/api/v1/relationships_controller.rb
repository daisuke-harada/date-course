class Api::V1::RelationshipsController < ApplicationController
  def create
    # フォローするユーザー
    current_user = User.find(params[:current_user_id])
    followed_user = User.find(params[:followed_user_id])
    binding.pry
    following = current_user.relationships.find_or_create_by(follow_id: followed_user.id) unless self == followed_user
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
