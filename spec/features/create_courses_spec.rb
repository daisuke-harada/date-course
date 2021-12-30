require 'rails_helper'

RSpec.feature "CreateCourses", type: :feature do
  scenario "ヘッダーからデートコース作成画面に遷移する" do
    user = FactoryBot.create(:user)
    user.image = fixture_file_upload('app/assets/images/test_image.jpg')
    sign_in_as user
    click_link "デートコースを作成"
    expect(page).to have_content "デートコースを作成する"
  end
end