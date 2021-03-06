module UserSupport
   # ログインを行う
  def sign_in_as(user)
    visit root_path
    click_link "ログイン"
    input_login_information user
  end

  def input_login_information(user)
    fill_in "名前", with: user.name
    fill_in "パスワード", with: user.password
    click_button "ログイン"
  end
end

RSpec.configure do |config|
  config.include UserSupport
end