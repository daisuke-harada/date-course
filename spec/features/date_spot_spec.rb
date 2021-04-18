require 'rails_helper'

RSpec.feature "DateSpots", type: :feature do
  scenario "新規投稿画面で新規投稿を行う" do
    user = FactoryBot.create(:admin)
    date_spot = FactoryBot.build(:date_spot)
    sign_in_as user
    fill_in "スポット名", with: date_spot.name
    "TODO: 都道府県と市とかを選択する"
    select "県", from: date_spot.address.prefecture.name
    select "市", from: date_spot.address.city_name
    "TODO: 営業時間"
    
    "TODO: カテゴリ登録"
    expect {
      click_button "登録"
      expect(page).to have_content "新規登録が完了しました。"
      "TODO: デートスポットを新規登録に成功した際の遷移先ページを書く"
    }.to change(DateSpot.all, :count).by(1)
  end
end