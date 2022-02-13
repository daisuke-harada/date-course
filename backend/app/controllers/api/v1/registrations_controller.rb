class Api::V1::RegistrationsController < ApplicationController
  def sign_up
    @user = User.new(registrations_params)
    if @user.save
      # ログインさせるヘルパーか?
      login
      render json: { status: :created, user: @user }
    else
      render json: { status: 500}
    end
  end

  private
  def registrations_params
    params.require(:user).permit(:name, :email, :gender, :password, :password_confirmation)
  end
end
