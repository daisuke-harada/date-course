class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    users = User.includes(:followers, :followings, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).ransack(name_cont: user_params[:name]).result.non_admins
    render status: :ok, json: users
  end

  def show
    render status: :ok, json: @user
  end

  def update
    if @user.update(user_params)
      render status: :ok, json: @user
    else
      render status: :unprocessable_entity, json: ErrorSerializer.new(@user).as_json
    end
  end

  def destroy
    @user.destroy
    render status: :no_content
  end

  private

  def user_params
    params.permit(:id, :name, :email, :gender, :image, :password, :password_confirmation)
  end

  def set_user
    @user = User.includes(:followers, :followings, date_spot_reviews: :date_spot, courses: {date_spots: {address: {date_spot: :date_spot_reviews}}}).find(params[:id])
  end
end
