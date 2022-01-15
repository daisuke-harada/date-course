require 'rails_helper'

RSpec.feature "ManagementDateSpot", type: :feature do
  scenario "デートコース作成画面に遷移する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    click_link "デートコース作成"
    expect(page).to have_content "デートコース作成画面"
  end

  scenario "デートスポットをデートコースに追加する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    sign_in_as user
    click_link "デートスポットを探す"
    expect do
      # デートコースにデートスポットを追加するボタンをクリック
      find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
      expect(page).to have_content "デートコース作成画面"
      expect(page).to have_content "#{address.date_spot.name}"
    end.to change(ManagementDateSpot.all, :count).by(1)
  end

  scenario "一度追加したデートスポットはデートコースに追加できない" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    sign_in_as user
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    expect(page).to have_content "このデートスポットはすでに追加されています"
  end

  scenario "デートコースに追加されたデートスポットから、デートスポット詳細ページに移動する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    date_spot = address.date_spot
    date_spot.image = fixture_file_upload('app/assets/images/test_image.jpg')
    sign_in_as user
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    find("#date_spot_image_id_#{address.date_spot.id}").click
  end

  scenario "デートコースに追加されたデートスポットから、ジャンルを選択しジャンル一覧ページへ移動する。" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    date_spot = address.date_spot
    date_spot.image = fixture_file_upload('app/assets/images/test_image.jpg')
    sign_in_as user
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    click_link "ショッピングモール"
  end

  scenario "デートコースに追加されたデートスポットをデートコースから削除する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    sign_in_as user
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    expect do
      click_link "デートコースから削除する"
      expect(page).to have_content "デートコースから#{address.date_spot.name}が削除されました"
    end.to change(ManagementDateSpot.all, :count).by(-1)
  end

  scenario "デートコースに追加されたデートスポットをデートコースからすべて削除する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    sign_in_as user
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{other_address.date_spot.id}").click
    expect do
      click_link "デートコースの内容をすべて削除する。"
      expect(page).to have_content "デートコースからデートスポットを全て削除しました。"
      expect(page).to have_content "デートスポットをデートコースに追加してみましょう"
    end.to change(ManagementDateSpot.all, :count).by(-2)
  end
end