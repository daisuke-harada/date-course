require 'rails_helper'

RSpec.feature "Users", type: :feature do
  scenario "新規登録画面で新規登録を行う" do
    user = FactoryBot.build(:user)
    user.image = fixture_file_upload('app/assets/images/test_image.jpg')
    visit root_path
    click_link "新規登録"
    input_registration user
    expect {
      click_button "登録"
      expect(page).to have_content "新規登録が完了しました"
      user_show_display user
    }.to change(User.all, :count).by(1)
  end

  scenario "ログイン画面から新規登録画面に遷移し、新規登録する" do
    user = FactoryBot.build(:user)
    user.image = fixture_file_upload('app/assets/images/test_image.jpg')
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
    user.image = fixture_file_upload('app/assets/images/test_image.jpg')
    sign_in_as user
    click_link "アカウント情報を編集する"
    fill_in "名前", with: "test"
    fill_in "メール", with: user.email
    choose "男性"
    fill_in "パスワード", with: user.password
    fill_in "パスワード(確認)", with: user.password_confirmation
    click_button "更新"
    aggregate_failures do
      expect(user.reload.name).to eq "test"
      expect(page).to have_content "test"
      expect(page).to have_content "#{user.change_sex_data_string}"
    end
  end

  scenario "ユーザー情報の編集に失敗する" do
    user = FactoryBot.create(:user)
    user.image = fixture_file_upload('app/assets/images/test_image.jpg')
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

  scenario "ユーザーの編集ページによるフレンドリーフォワーディング機能のテスト" do
    user = FactoryBot.create(:user)
    visit edit_user_path(user)
    sign_in_as user
    expect(page).to have_current_path edit_user_path(user)
  end

  scenario "フレンドリーフォワーディング機能によって記憶されたURLが違うユーザーの物だったらそのユーザーのページには遷移しない" do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.create(:other_user)
    visit edit_user_path(other_user)
    sign_in_as user
    expect(page).to have_current_path user_path(user)
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

  scenario "TOPページからユーザーを名前で検索する" do
    user = FactoryBot.create(:user)
    visit root_path
    choose "select_search_target_User"
    fill_in "search_name", with: user.name
    click_button "検索"
    user_show_display(user)
  end

  scenario "ユーザー一覧ページからユーザーを名前で検索する" do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.create(:other_user)
    visit users_path
    fill_in "q_name_cont", with: user.name
    click_button "user_name_search"
    user_show_display(user)
  end

  scenario "デートスポット一覧ページからユーザーを名前で検索する" do
    FactoryBot.create(:address)
    user = FactoryBot.create(:user)
    visit date_spots_path
    fill_in "q_name_cont", with: user.name
    click_button "user_name_search"
    user_show_display(user)
  end

  scenario "ユーザーを探すページからユーザーをフォローする", js: true do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.create(:other_user)
    sign_in_as user
    click_link "ユーザーを探す"
    click_button "follow_id_#{other_user.id}" # フォローする。
  end

  scenario "ユーザーを探すページから、ユーザーをフォローして、そのユーザーのフォローを解除する", js: true do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.create(:other_user)
    sign_in_as user
    click_link "ユーザーを探す"
    click_button "follow_id_#{other_user.id}" # フォローする。
    click_button "un_follow_id_#{other_user.id}" # アンフォローする。
  end

  scenario "ユーザーを探すページから、ユーザー詳細ページに遷移してユーザーをフォローする", js: true do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.create(:other_user)
    sign_in_as user
    click_link "ユーザーを探す"
    find("#user_image_id_#{other_user.id}").click
    click_button "follow_id_#{other_user.id}" # フォローする。
  end

  scenario "ユーザーを探すページから、ユーザーをフォローして、ユーザー詳細ページに遷移して、そのユーザーのフォローを解除する", js: true do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.create(:other_user)
    sign_in_as user
    click_link "ユーザーを探す"
    click_button "follow_id_#{other_user.id}" # フォローする。
    click_link("user_image_id_#{other_user.id}")
    click_button "un_follow_id_#{other_user.id}" # フォローを解除する。
  end

  scenario "マイページから、フォローしているユーザーの一覧を表示する。", js: true do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.create(:other_user)
    sign_in_as user
    click_link "ユーザーを探す"
    click_button "follow_id_#{other_user.id}" # フォローする。
    click_link 'マイページ'
    click_link("followings_link_#{user.id}")
    expect(page).to have_content "すべてのフォローしているユーザー"
    user_show_display(other_user)
  end
  scenario "マイページから、フォローされているユーザーの一覧を表示する。", js: true do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.create(:other_user)
    sign_in_as user
    click_link "ユーザーを探す"
    click_button "follow_id_#{other_user.id}" # フォローする。
    click_link "ログアウト"
    sign_in_as other_user
    click_link("followers_link_#{other_user.id}")
    expect(page).to have_content "すべてのフォロワー"
    user_show_display(user)
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
