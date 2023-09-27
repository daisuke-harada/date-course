class Api::V1::SessionsController < ApplicationController
  # deviseに変えてもいい気がする
  def login
    user = User.find_by(name: session_params[:name])
    if user&.authenticate(session_params[:password])
      render json: {login_status: true, user: user.info_with_following_and_followers_ids}
    else
      render json: {login_status: false, status: 401, errors: ["認証に失敗しました。", "正しい名前・パスワードを入力し直すか、新規登録を行ってください。"]}
    end
  end

  private

  def session_params
    params.require(:sign_in_params).permit(:name, :password)
  end
end
