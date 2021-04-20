require 'rails_helper'

RSpec.feature "DateSpots", type: :feature do
  scenario "新規投稿画面で新規投稿に成功する" do
    admin = FactoryBot.create(:admin)
    date_spot = FactoryBot.build(:date_spot) 
    address = date_spot.build_address(FactoryBot.attributes_for(:address))
    sign_in_as admin
    click_link "デートスポット作成"
    date_spot_information_insert(date_spot)
    
    expect {
      click_button "登録"
      expect(page).to have_content "デートスポットの登録が完了しました"
      "TODO: デートスポットを新規登録に成功した際の遷移先ページを書く"
      date_spot_display(date_spot)
    }.to change(DateSpot.all, :count).by(1)
  end

  scenario "デートスポット詳細ページからデートスポット編集ページに遷移し、デートスポット情報を更新する" do
    admin = FactoryBot.create(:admin)
    date_spot = FactoryBot.create(:date_spot) 
    date_spot.create_address(FactoryBot.attributes_for(:address))
    other_spot = FactoryBot.build(:other_spot)
    other_spot.build_address(FactoryBot.attributes_for(:other_address))
    date_spot.save
    sign_in_as admin
    click_link "デートスポットを探す"
    click_button "このデートスポットを見る"
    date_spot_display(date_spot)
    click_button "このデートスポットを編集する"
    date_spot_information_insert(other_spot)
  end
end

def date_spot_display(date_spot)
  aggregate_failures do
    expect(page).to have_content "#{date_spot.name}"
    expect(page).to have_content "営業時間#{date_spot.opening_time} ~ #{date_spot.closing_time}"
    expect(page).to have_content "#{date_spot.address.prefecture.name}"
    expect(page).to have_content "#{date_spot.address.city_name}"
  end
end

def date_spot_information_insert(date_spot)
  fill_in "デートスポット名", with: date_spot.name
  find("#date_spot_address_attributes_prefecture_id").find("option[value='#{date_spot.address.prefecture_id}']").select_option
  fill_in "市町村名、番地", with: date_spot.address.city_name 
  fill_in "始業時間", with: date_spot.opening_time
  fill_in "終業時間", with: date_spot.closing_time
  "TODO: カテゴリ登録"
end