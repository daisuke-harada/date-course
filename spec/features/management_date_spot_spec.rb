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
    date_spot = address.date_spot
    sign_in_as user
    click_link "デートスポットを探す"
    expect do
      click_button "デートコースに追加する"
      expect(page).to have_content "デートコース作成画面"
      expect(page).to have_content "キャナルシティ"
    end.to change(ManagementDateSpot.all, :count).by(1)
  end

  scenario "一度追加したデートスポットはデートコースに追加できない" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    date_spot = address.date_spot
    sign_in_as user
    click_link "デートスポットを探す"
    click_button "デートコースに追加する"
    click_link "デートスポットを探す"
    click_button "デートコースに追加する"
    expect(page).to have_content "このデートスポットはすでに追加されています"
  end

  scenario "デートコースに追加されたデートスポットから、デートスポット詳細ページに移動する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    date_spot = address.date_spot
    date_spot.image = fixture_file_upload('app/assets/images/test_image.jpg')
    sign_in_as user
    click_link "デートスポットを探す"
    click_button "デートコースに追加する"
    find("#date_spot_image_id_#{address.date_spot.id}").click
  end

  scenario "デートコースに追加されたデートスポットから、ジャンルを選択しジャンル一覧ページへ移動する。" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    date_spot = address.date_spot
    date_spot.image = fixture_file_upload('app/assets/images/test_image.jpg')
    sign_in_as user
    click_link "デートスポットを探す"
    click_button "デートコースに追加する"
    click_link "ショッピングモール"
  end
end