class Api::V1::UsersController < ApplicationController
  before_action :user_find_param_id, only: [:show, :update, :destroy]

  def index
    @users = User.where(admin: false)
    render json: { users: @users}
  end

  def show
    render json: { user: @user }
  end

  def update
    if @user.update(user_params)
      render json: {status: :update, user: @user }
    else
      render json: { status: 500, error_messages: @user.errors.messages}
    end
  end

  def destroy
    @user.destroy
    render json: {status: :delete}
  end

  private

  def user_params
    params.permit(:name, :email, :gender, :image, :password, :password_confirmation)
  end

  def user_find_param_id
    @user = User.find(params[:id])
  end
end
