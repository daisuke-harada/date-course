class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.where(admin: false).map(&:info_with_following_and_followers_ids)
    render json: {users: @users}
  end

  def show
    courses = map_info(@user.courses)
    date_spot_reviews = map_date_spot_reviews(@user.date_spot_reviews)

    render json: {user: UserSerializer.new(@user).attributes, courses: courses.map { |course| CourseSerializer.new(course).attributes }, date_spot_reviews: date_spot_reviews}
  end

  def update
    if @user.update(user_params)
      render json: {status: :updated, user: UserSerializer.new(@user).attributes}
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

  def map_info(items)
    items.map(&:info)
  end

  def map_date_spot_reviews(reviews)
    reviews.map do |review|
      {
        id: review.id,
        rate: review.rate,
        content: review.content,
        date_spot: review.date_spot
      }
    end
  end
end
