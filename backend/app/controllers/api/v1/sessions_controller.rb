class Api::V1::SessionsController < ApplicationController
  def login
    @user = User.find_by(name: session_params[:name])
    if @user && @user.authenticate(session_params[:password])
      render json: { login_status: true, user: @user }
    else
      render json: { status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
    end
  end

  private
    def session_params
      params.require(:sign_in_params).permit(:name, :password)
    end
end
