class Api::V1::SessionsController < ApplicationController
  def login
    @user = User.find_by(name: session_params[:name])
    if @user && @user.authenticate(session_params[:password])
      login_action
      binding.pry
      render json: { logged_in: true, user: @user }
    else
      render json: { status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end

  def logged_in
    if @current_user
      render json: { logged_in: true, user: current_user }
    else
      render json: { logged_in: false, message: 'ユーザーが存在しません' }
    end
  end

  private
    def session_params
      params.require(:sign_in_params).permit(:name, :password)
    end
end
