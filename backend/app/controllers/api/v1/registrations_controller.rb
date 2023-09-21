class Api::V1::RegistrationsController < ApplicationController
  def signup
    @user = User.new(registrations_params)
    if @user.save
      render json: { status: :created, login_status: true, user: user_and_userFollowingsAndFollowers(@user) }
    else
      render json: { status: 500, error_messages: @user.errors.messages}
    end
  end

  private

  def registrations_params
    params.permit(:name, :email, :gender, :image, :password, :password_confirmation)
  end
end
