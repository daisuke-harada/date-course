class UsersController < ApplicationController
  before_action :logged_in_user,     only: [:edit, :update, :destroy]
  before_action :correct_user,       only: [:edit, :update, :destroy]
  before_action :user_find_param_id, only: [:show, :edit, :update, :destroy]
  before_action :set_q_for_date_spot
  before_action :set_q_for_user

  def show; end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "新規登録が完了しました"
      redirect_to @user
    else
      render 'new'
    end
  end

  def edit; end

  def update
    if @user.update(user_params)
      flash.now[:success] = "#{@user.name}さんの情報を更新しました。"
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    @user.destroy
    log_out if logged_in?
    flash[:success] = "退会しました"
    redirect_to root_url
  end

  def index
    # @users = User.where(admin: false)
    # 管理者以外のユーザーを検索結果から全て表示する
    @users = @user_search_params.result.where(admin: false)
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :sex, :password, :password_confirmation, :image)
  end

  def user_find_param_id
    @user = User.find(params[:id])
  end

  def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "ログインしてください"
      redirect_to login_url
    end
  end

  # そのアカウントを持っている人以外がアクセスすることを防ぐ
  def correct_user
    @user = User.find(params[:id])
    redirect_to(current_user) unless @user == current_user
  end
end
