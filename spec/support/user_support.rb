module UserSupport
  # ユーザーのshowページの情報を表示する
  def user_show_display(user)
    expect(page).to have_content "#{user.name}"
    expect(page).to have_content "#{user.change_sex_data_string}"
  end

  # ログインを行う
  def sign_in_as(user)
    visit root_path
    click_link "ログイン"
    fill_in "名前", with: user.name
    fill_in "パスワード", with: user.password
    click_button "ログイン"
  end
end

RSpec.configure do |config|
  config.include UserSupport
end