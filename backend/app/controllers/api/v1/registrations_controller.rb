class Api::V1::RegistrationsController < ApplicationController
  def signup
    @user = User.new(registrations_params)
    if @user.save
      render json: @user, serializer: RegistrationSerializer
    else
      render json: @user, serializer: ErrorSerializer
    end
  end

  private

  def registrations_params
    params.permit(:name, :email, :gender, :image, :password, :password_confirmation)
  end
end
