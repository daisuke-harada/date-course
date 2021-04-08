require 'rails_helper'

RSpec.feature "Users", type: :feature do
  scenario "新規登録画面で新規登録を行う" do
    user = FactoryBot.build(:user)
    visit root_path
    click_link "新規登録"
    input_registration user
    expect {
      click_button "登録"
      expect(page).to have_content "新規登録が完了しました。"
      user_show_display user
    }.to change(User.all, :count).by(1)
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

  scenario "ユーザー情報の編集に成功する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    click_link "アカウント情報を編集する"
    fill_in "名前", with: "test"
    fill_in "メール", with: user.email
    choose "男性"
    fill_in "パスワード", with: user.password
    fill_in "パスワード(確認)", with: user.password_confirmation
    click_button "更新"
    aggregate_failures do
      expect(page).to have_content "test"
      expect(page).to have_content "#{user.change_sex_data_string}"
    end
  end

  scenario "ユーザー情報の編集に失敗する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    click_link "アカウント情報を編集する"
    fill_in "名前", with: nil
    fill_in "メール", with: user.email
    choose "男性"
    fill_in "パスワード", with: user.password
    fill_in "パスワード(確認)", with: user.password_confirmation
    click_button "更新"
    expect(page).to have_current_path "/users/#{user.id}"
  end

  scenario "退会をする" do
    user = FactoryBot.create(:user)
    sign_in_as user
    click_link "アカウント情報を編集する"
    expect {
      click_link "退会する"
      expect(page).to have_content "退会しました"
    }.to change(User.all, :count).by(-1)
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
