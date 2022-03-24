class WelcomeController < ApplicationController
  def hello
    render json: {message: 'hello'}
  end
end
