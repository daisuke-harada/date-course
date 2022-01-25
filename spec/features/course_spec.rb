require 'rails_helper'

RSpec.feature "Courses", type: :feature do
  scenario "デートコース一覧画に遷移する" do
    visit root_path
    click_link "デートコースを探す"
    expect(page).to have_content "デートコース一覧ページ"
  end
end