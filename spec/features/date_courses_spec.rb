require 'rails_helper'

RSpec.feature "DateCourses", type: :feature do
  scenario "ヘッダーからデートコース一覧画面に遷移する" do
    visit root_path
    click_link "デートコースを探す"
    expect(page).to have_content "デートコース一覧"
  end

  scenario "ヘッダーからデートコース作成画面に遷移する" do
    user = FactoryBot.create(:user)
    sign_in_as(user)
    click_link "デートコース作成"
    expect(page).to have_content "デートコースを作成する"
  end
end