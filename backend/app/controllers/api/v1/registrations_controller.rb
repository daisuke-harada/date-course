class Api::V1::RegistrationsController < ApplicationController
  def signup
    @user = User.new(registrations_params)
    if @user.save
      login
      binding.pry
      render json: { status: :created, user: @user }
    else
      binding.pry
      render json: { status: 500}
    end
  end

  private
  def registrations_params
    params.require(:user).permit(:name, :email, :gender, :password, :password_confirmation)
  end
end
