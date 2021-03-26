class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update, :destroy]
  before_action :correct_user,   only: [:edit, :update]

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash.now[:success] = "新規登録が完了しました。"
      log_in @user
      redirect_back_or @user
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      flash.now[:success] = "#{@user.name}さんの情報を更新しました。"
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    
    @user = User.find(params[:id])
    @user.destroy
    log_out if logged_in?
    binding.pry
    flash[:success] = "退会しました"
    redirect_to root_url
  end

  def index
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :sex, :password, :password_confirmation, :image)
    end

    def logged_in_user
      unless logged_in?
        store_location
        flash[:danger] = "ログインしてください"
        redirect_to login_url
      end
    end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless @user == current_user 
    end
end

