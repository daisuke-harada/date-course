class Api::V1::SessionsController < ApplicationController
  def create
    binding.pry
    user = User.find_by(name: params[:session][:name])
    if user && user.authenticate(params[:session][:password])
      administrator_confirm_log_in user
    else
      render 'new'
    end
  end
  def destroy
  end
end
