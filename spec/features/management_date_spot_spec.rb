require 'rails_helper'

RSpec.feature "ManagementDateSpot", type: :feature do
  scenario "デートコース作成画面に遷移する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    click_link "デートコース作成"
    expect(page).to have_content "デートコース作成"
  end

  scenario "デートコース作成画面にデートコースが存在しない場合メッセージが表示される" do
    user = FactoryBot.create(:user)
    sign_in_as user
    click_link "デートコース作成"
    expect(page).to have_content "デートコース作成"
    expect(page).to have_content "目的地は登録されていません。デートスポットをデートコースに追加してみましょう。"
  end

  scenario "デートスポットをデートコース作成画面に追加する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    sign_in_as user
    click_link "デートスポットを探す"
    expect do
      # デートコースにデートスポットを追加するボタンをクリック
      find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
      expect(page).to have_content "デートコース作成"
      expect(page).to have_content "#{address.date_spot.name}"
    end.to change(ManagementDateSpot.all, :count).by(1)
  end

  scenario "一度デートコース作成画面に追加したデートスポットはデートコースに追加できない" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    two_add_date_spot(address, other_address)
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    expect(page).to have_content "このデートスポットはすでに追加されています"
  end

  scenario "デートコース作成画面に追加されたデートスポットから、デートスポット詳細ページに移動する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    sign_in_as user
    two_add_date_spot(address, other_address)
    date_spot = address.date_spot
    date_spot.image = fixture_file_upload('app/assets/images/test_image.jpg')
    find("#date_spot_image_id_#{date_spot.id}").click
    expect(page).to have_content "#{date_spot.name}"
  end

  scenario "デートコース作成画面に追加されたデートスポットから、ジャンルを選択しジャンル一覧ページへ移動する。" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    two_add_date_spot(address, other_address)
    click_link "ショッピングモール"
  end

  scenario "デートコース作成画面に追加されたデートスポットをデートコースから削除する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    sign_in_as user
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    expect do
      click_link "デートコースから削除"
      expect(page).to have_content "デートコースから#{address.date_spot.name}が削除されました"
    end.to change(ManagementDateSpot.all, :count).by(-1)
  end

  scenario "デートコース作成画面に追加されたデートスポットをデートコースからすべて削除する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    two_add_date_spot(address, other_address)
    expect do
      click_link "デートコースの内容をすべて削除する"
      expect(page).to have_content "デートコースからデートスポットを全て削除しました。"
      expect(page).to have_content "目的地は登録されていません。デートスポットをデートコースに追加してみましょう"
    end.to change(ManagementDateSpot.all, :count).by(-2)
  end

  scenario "デートコース作成画面に追加されたデートスポットをデートコースとして他のユーザーに公開して、登録する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    two_add_date_spot(address, other_address)
    fill_in 'date_course_scheduled_time', with: '2022-03-04'
    find("#date_course_true_button").click
    click_button "デートコースを登録する"
  end

  scenario "デートスポットをデートコースに追加した後に、デートコース登録確認画面に遷移し、再びデートコース作成画面に遷移する。" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    two_add_date_spot(address, other_address)

  end

end

# 配列スプレッド構文に変更
def two_add_date_spot(date_spot_address, other_spot_address)
  aggregate_failures do
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{date_spot_address.date_spot.id}").click
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{other_spot_address.date_spot.id}").click
  end
end

def date_spot_display(date_spot)
  aggregate_failures do
    expect(page).to have_content date_spot.name.to_s
    expect(page).to have_content "営業時間"
    expect(page).to have_content "#{date_spot.opening_time.strftime('%H:%M')} ~ #{date_spot.closing_time.strftime('%H:%M')}"
    expect(page).to have_content date_spot.genre.name.to_s
    expect(page).to have_content date_spot.address.city_name.to_s
  end
end