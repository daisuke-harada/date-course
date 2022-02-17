class Api::V1::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    binding.pry
    render json: { user: @user }
  end
end
