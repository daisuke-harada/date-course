require 'rails_helper'

RSpec.feature "DateSpots", type: :feature do
  scenario "新規投稿画面で新規投稿に成功する" do
    user = FactoryBot.create(:admin)
    date_spot = FactoryBot.build(:date_spot)
    address = FactoryBot.build(:address)
    sign_in_as user
    click_link "デートスポット作成"
    fill_in "デートスポット名", with: date_spot.name
    find("#date_spot_address_attributes_prefecture_id").find("option[value='#{address.prefecture_id}']").select_option
    fill_in "市町村名、番地", with: address.city_name 
    "TODO: 営業時間"
    fill_in "始業時間", with: date_spot.opening_time
    fill_in "終業時間", with: date_spot.closing_time
    
    "TODO: カテゴリ登録"
    expect {
      click_button "登録"
      expect(page).to have_content "デートスポットの登録が完了しました"
      "TODO: デートスポットを新規登録に成功した際の遷移先ページを書く"
    }.to change(DateSpot.all, :count).by(1)
  end
end