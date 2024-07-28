class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    users = User.includes(:followers, :followings, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).non_admins
    render json: users
  end

  def show
    courses = @user.courses.includes(date_spots: {address: {date_spot: :date_spot_reviews}})
    date_spot_reviews = @user.date_spot_reviews.includes(:date_spot)
    render json: {
      user: UserSerializer.new(@user).attributes,
      courses: courses.map { |course| CourseSerializer.new(course).attributes },
      date_spot_reviews: date_spot_reviews.map { |review| { id: review.id, rate: review.rate, content: review.content, date_spot: review.date_spot} }
    }
  end

  def update
    if @user.update(user_params)
      render json: {status: :updated, user: UserSerializer.new(@user).attributes}
    else
      render json: ErrorSerializer.new(@user).as_json
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
