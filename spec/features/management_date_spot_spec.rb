require 'rails_helper'

RSpec.feature "ManagementDateSpot", type: :feature do
  scenario "デートコース作成画面に遷移する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    click_link "デートコース作成"
    expect(page).to have_content "デートコース作成画面"
  end
end