class Api::V1::UsersController < ApplicationController
  before_action :user_find_param_id, only: [:show, :update]

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

  private

  def user_params
    params.require(:user).permit(:name, :email, :gender, :password, :password_confirmation, :image)
  end

  def user_find_param_id
    @user = User.find(params[:id])
  end
end
