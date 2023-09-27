class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.where(admin: false).map do |user|
      user.info_with_following_and_followers_ids
    end
    render json: {users: @users}
  end

  def show
    courses = @user.courses.map do |course|
      course.info
    end

    date_spot_reviews = @user.date_spot_reviews.map do |review|
      {
        id: review.id,
        rate: review.rate,
        content: review.content,
        date_spot: review.date_spot
      }
    end

    render json: {user: @user.info_with_following_and_followers_ids, courses: courses, date_spot_reviews: date_spot_reviews}
  end

  def update
    if @user.update(user_params)
      render json: {status: :updated, user: @user.info_with_following_and_followers_ids}
    else
      render json: {status: 500, error_messages: @user.errors.messages}
    end
  end

  def destroy
    @user.destroy
    render json: {status: :deleted}
  end

  private

  def user_params
    params.permit(:name, :email, :gender, :image, :password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
