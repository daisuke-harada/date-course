require 'rails_helper'

RSpec.feature "Users", type: :feature do
  scenario "新規登録画面で新規登録を行う" do
    user = FactoryBot.build(:user)
    visit root_path
    click_link "新規登録"
    input_registration user
    expect {
      click_button "登録"
      user_show_display user
    }.to change(User.all, :count).by(1)
  end

  scenario "新規登録画面からログイン画面に遷移し、ログインする" do
    user = FactoryBot.create(:user)
    visit root_path
    click_link "新規登録"
    click_link "ログインはこちら"
    input_login_information user
  end

  scenario "ログイン画面から新規登録画面に遷移し、新規登録する" do
    user = FactoryBot.build(:user)
    visit root_path
    click_link "ログイン"
    click_link "新規登録はこちら"
    input_registration user
    expect {
      click_button "登録"
      user_show_display user
    }.to change(User.all, :count).by(1)
  end

  scenario "ログインを行う" do
    user = FactoryBot.create(:user)
    sign_in_as user
    user_show_display user
  end

  scenario "簡単ログインを行う" do
    user = FactoryBot.create(:guest)
    visit root_path
    click_button "ゲストログイン(1クリック)"
    user_show_display user
  end
end

# ユーザーのshowページの情報を表示する
def user_show_display(user)
  aggregate_failures do
    expect(page).to have_content "#{user.name}"
    expect(page).to have_content "#{user.change_sex_data_string}"
  end
end

def input_registration(user)
  fill_in "名前", with: user.name
  fill_in "メール", with: user.email
  choose "男性"
  fill_in "パスワード", with: user.password
  fill_in "パスワード(確認)", with: user.password_confirmation
end
