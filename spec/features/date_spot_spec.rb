require 'rails_helper'

RSpec.feature "DateSpots", type: :feature do
  scenario "新規投稿画面で新規投稿に成功する" do
    admin = FactoryBot.create(:admin)
    address = FactoryBot.build(:address)
    sign_in_as admin
    click_link "デートスポット作成"
    date_spot_information_insert(address.date_spot)
    
    expect {
      click_button "登録"
      expect(page).to have_content "デートスポットの登録が完了しました"
      date_spot_display(address.date_spot)
    }.to change(DateSpot.all, :count).by(1)
  end

  scenario "デートスポット編集ページに遷移し、デートスポット情報を更新する" do
    admin = FactoryBot.create(:admin)
    address = FactoryBot.create(:address)
    other_spot = FactoryBot.build(:other_spot)
    other_spot.build_address(FactoryBot.attributes_for(:other_address))
    sign_in_as admin
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    date_spot_display(address.date_spot)
    click_link "このデートスポットを編集する"
    date_spot_information_insert(other_spot)
    expect {
      click_button "更新"
      expect(page).to have_content "デートスポット情報の更新が完了しました"
      date_spot_display(other_spot)
    }.to change(DateSpot.all, :count).by(0)
  end

  scenario "デートスポット編集ページに遷移し、デートスポット情報を削除する" do
    admin = FactoryBot.create(:admin)
    address = FactoryBot.create(:address)
    sign_in_as admin
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    date_spot_display(address.date_spot)
    click_link "このデートスポットを編集する"
    expect {
      click_link "このデートスポットを削除する"
      expect(page).to have_content "デートスポットを削除しました"
    }.to change(DateSpot.all, :count).by(-1)
  end
end

def date_spot_display(date_spot)
  aggregate_failures do
    expect(page).to have_content "#{date_spot.name}"
    expect(page).to have_content "営業時間 #{date_spot.opening_time.strftime('%H:%M')} ~ #{date_spot.closing_time.strftime('%H:%M')}"
    expect(page).to have_content "#{date_spot.genre.name}"
    expect(page).to have_content "#{date_spot.address.prefecture.name}"
    expect(page).to have_content "#{date_spot.address.city_name}"
  end
end

def date_spot_information_insert(date_spot)
  fill_in "デートスポット名", with: date_spot.name
  find("#date_spot_address_attributes_prefecture_id").find("option[value='#{date_spot.address.prefecture_id}']").select_option
  find("#date_spot_genre_id").find("option[value='#{date_spot.genre_id}']").select_option
  fill_in "市町村名、番地", with: date_spot.address.city_name 
  fill_in "始業時間", with: date_spot.opening_time
  fill_in "終業時間", with: date_spot.closing_time
end