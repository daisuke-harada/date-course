class Api::V1::RegistrationsController < ApplicationController
  def signup
    @user = User.new(registrations_params)
    if @user.save
      # ユーザーはSerilalizserで返す
      render json: {status: :created, login_status: true, user: ActiveModelSerializers::SerializableResource.new(@user, serializer: UserSerializer)}
    else
      render json: {status: 500, error_messages: @user.errors.messages}
    end
  end

  private

  def registrations_params
    params.permit(:name, :email, :gender, :image, :password, :password_confirmation)
  end
end
