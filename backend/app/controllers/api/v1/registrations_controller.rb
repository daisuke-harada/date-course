class Api::V1::RegistrationsController < ApplicationController
  def signup
    @user = User.new(registrations_params)
    if @user.save
      render json: { status: :created, login_status: true, user_id: @user.id }
    else
      render json: { status: 500}
    end
  end

  private
  def registrations_params
    params.require(:user).permit(:name, :email, :gender, :password, :password_confirmation)
  end
end
