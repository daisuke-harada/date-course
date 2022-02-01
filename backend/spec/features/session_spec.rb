RSpec.feature "Sessions", type: :feature do
  scenario "新規登録画面からログイン画面に遷移し、ログインする" do
    user = FactoryBot.create(:user)
    visit root_path
    click_link "新規登録"
    click_link "ログインはこちら"
    input_login_information user
    expect(page).to have_content "ログインに成功しました"
    user_show_display user
  end

  scenario "ログインを行う" do
    user = FactoryBot.create(:user)
    sign_in_as user
    expect(page).to have_content "ログインに成功しました"
    user_show_display user
  end

  scenario "ログインに失敗する" do
    user = FactoryBot.create(:user)
    user.name = "test"
    sign_in_as user
    expect(page).to have_content "ログインに失敗しました"
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
    expect(page).to have_content user.name.to_s
    expect(page).to have_content user.change_gender_data_string.to_s
  end
end
