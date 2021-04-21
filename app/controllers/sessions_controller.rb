class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(name: params[:session][:name])
    if user && user.authenticate(params[:session][:password])
      administrator_confirm_log_in user
    else
      flash.now[:danger] = "ログインに失敗しました。"
      render 'new'
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

  private

    def administrator_confirm_log_in (user)
      log_in user
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
      flash[:success] = "ログインに成功しました。"
      if user.admin == false
        redirect_to user
      elsif user.admin == true
        redirect_to root_path
      end
    end
end
