require 'rails_helper'

RSpec.feature "Courses", type: :feature do
  scenario "ヘッダーからデートコース一覧画面に遷移する" do
    visit root_path
    click_link "デートコースを探す"
    expect(page).to have_content "デートコース一覧"
  end
end