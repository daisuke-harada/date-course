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

  scenario "TOPページからデートスポットを名前で検索する" do
    address = FactoryBot.create(:address)
    visit root_path
    choose "select_search_target_Date"
    fill_in "search_name", with: address.date_spot.name
    click_button "検索"
    date_spot_display(address.date_spot)
  end

  scenario "デートスポット一覧ページからデートスポットを名前で検索する" do
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    visit date_spots_path
    fill_in "date_spot_search_name_cont", with: address.date_spot.name
    click_button "date_spot_name_search"
    date_spot_display(address.date_spot)
  end

  scenario "デートスポット一覧ページからデートスポットをジャンル、県名、来店時間で検索する" do
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    visit date_spots_path
    find("#date_spot_search_address_prefecture_id_eq").find("option[value='#{address.prefecture_id}']").select_option
    find("#date_spot_search_genre_id_eq").find("option[value='#{address.date_spot.genre_id}']").select_option
    find("#date_spot_search_opening_time_lteq").find("option[value= '2000-01-01 10:00:00 UTC']").select_option
    click_button "date_spot_sort_search"
    date_spot_display(address.date_spot)
  end

  scenario "デートスポット一覧ページからデートスポットをジャンルで検索する" do
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    visit date_spots_path
    find("#date_spot_search_genre_id_eq").find("option[value='#{address.date_spot.genre_id}']").select_option
    click_button "date_spot_sort_search"
    date_spot_display(address.date_spot)
  end

  scenario "デートスポット一覧ページからデートスポットを県名で検索する" do
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    visit date_spots_path
    find("#date_spot_search_address_prefecture_id_eq").find("option[value='#{address.prefecture_id}']").select_option
    click_button "date_spot_sort_search"
    date_spot_display(address.date_spot)
  end

  scenario "デートスポット一覧ページからデートスポットを来店時間で検索する" do
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    visit date_spots_path
    find("#date_spot_search_opening_time_lteq").find("option[value= '2000-01-01 10:00:00 UTC']").select_option
    click_button "date_spot_sort_search"
    date_spot_display(address.date_spot)
  end

  scenario "デートスポット一覧ページからデートスポットを来店時間で検索した際に、対応した検索結果がない場合、検索結果がないというメッセージが表示される" do
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    visit date_spots_path
    find("#date_spot_search_opening_time_lteq").find("option[value='2000-01-02 01:00:00 UTC']").select_option
    click_button "date_spot_sort_search"
    expect(find('#search_no_result').text).to eq '⚠︎検索結果はありませんでした。'
  end

  scenario "ユーザー一覧ページからデートスポットを名前で検索する" do
    address = FactoryBot.create(:address)
    FactoryBot.create(:user)
    visit users_path
    fill_in "date_spot_search_name_cont", with: address.date_spot.name
    click_button "date_spot_name_search"
    date_spot_display(address.date_spot)
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
  find("#date_spot_opening_time").find("option[value='#{date_spot.opening_time}']").select_option
  find("#date_spot_closing_time").find("option[value='#{date_spot.closing_time}']").select_option
end