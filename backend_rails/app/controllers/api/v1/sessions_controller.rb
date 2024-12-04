class Api::V1::SessionsController < ApplicationController
  # deviseに変えてもいい気がする
  def login
    user = User.find_by(name: session_params[:name])
    if user&.authenticate(session_params[:password])
      render status: :ok, json: user
    else
      render status: :unauthorized, json: {error_messages: ["認証に失敗しました。", "正しい名前・パスワードを入力し直すか、新規登録を行ってください。"]}
    end
  end

  private

  def session_params
    params.require(:sign_in_params).permit(:name, :password)
  end
end
