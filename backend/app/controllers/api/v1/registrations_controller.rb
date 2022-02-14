class Api::V1::RegistrationsController < ApplicationController
  def signup
    @user = User.new(registrations_params)
    binding.pry
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
