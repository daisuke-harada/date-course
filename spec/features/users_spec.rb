require 'rails_helper'

RSpec.feature "Users", type: :feature do
  before do
    guest = FactoryBot.create(:guest)
  end

  scenario "新規登録画面で新規登録を行う" do
    user = FactoryBot.build(:user)
    visit root_url
    click_link "新規登録"
    fill_in "名前", with: user.name
    fill_in "メール", with: user.email
    choose "男性"
    fill_in "パスワード", with: user.password
    fill_in "パスワード(確認)", with: user.password_confirmation
    expect {
      click_button "登録"
      expect(page).to have_content "#{user.name}"
      expect(page).to have_content "#{user.sex_status}"
    }.to change(User.all, :count).by(1)
  end
end
