class Api::V1::HomesController < ApplicationController
  def top
    render json: { status: 200, message: "Hello World"}
  end
end
