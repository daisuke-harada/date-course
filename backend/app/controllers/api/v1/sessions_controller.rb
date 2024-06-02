class Api::V1::SessionsController < ApplicationController
  # deviseに変えてもいい気がする
  def login
    user = User.find_by(name: session_params[:name])

    if user&.authenticate(session_params[:password])
      binding.pry
      render json: SessionsSerializer.new(user).as_json
    else
      render json: FailureSessionsSerializer.new(user).as_json
    end
  end

  private

  def session_params
    params.require(:sign_in_params).permit(:name, :password)
  end
end
