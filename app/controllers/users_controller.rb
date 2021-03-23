class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "新規登録が完了しました。"
      log_in @user
      redirect_to @user
    else
      render 'new'
    end
  end

  def edit
  end

  def index
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :sex, :password, :password_confirmation, :profile_image)
    end

end
