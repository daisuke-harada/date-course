class Api::V1::RegistrationsController < ApplicationController
  def signup
    user = User.new(registrations_params)

    if user.save
      render status: :created, json: RegistrationSerializer.new(user).as_json
    else
      render status: :unprocessable_entity, json: ErrorSerializer.new(user).as_json
    end
  end

  private

  def registrations_params
    params.permit(:name, :email, :gender, :image, :password, :password_confirmation)
  end
end
