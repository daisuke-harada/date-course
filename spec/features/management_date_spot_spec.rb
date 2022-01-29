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
    date_spot_addresses = [address, other_address]
    add_date_spot_array(date_spot_addresses)
    click_link "デートスポットを探す"
    find("#add_date_course_date_spot_id_#{address.date_spot.id}").click
    expect(page).to have_content "このデートスポットはすでに追加されています"
  end

  scenario "デートコース作成画面に追加されたデートスポットから、デートスポット詳細ページに移動する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    sign_in_as user
    date_spot_addresses = [address, other_address]
    add_date_spot_array(date_spot_addresses)
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
    date_spot_addresses = [address, other_address]
    add_date_spot_array(date_spot_addresses)
    click_link "ショッピングモール"
  end

  scenario "デートコースデートコースから削除する" do
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

  scenario "デートコース作成画面でデートコースを構築後デートコースからデートスポットをすべて削除する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    date_spot_addresses = [address, other_address]
    add_date_spot_array(date_spot_addresses)
    expect do
      click_link "デートコースの内容をすべて削除する"
      expect(page).to have_content "デートコースからデートスポットを全て削除しました。"
      expect(page).to have_content "目的地は登録されていません。デートスポットをデートコースに追加してみましょう"
    end.to change(ManagementDateSpot.all, :count).by(-2)
  end

  scenario "デートコース作成画面でデートコースを構築後、デートコースとして他のユーザーに公開して、登録する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    date_spot_addresses = [address, other_address]
    date_spot_info_regist(date_spot_addresses, "2022", "03", "04", "DRIVING", true)
    click_link "デートコースを探す"
    expect(page).to have_content "デートコース一覧"
    expect(page).to have_content "2022年03月04日にデートの予定"
    date_spot_names_display(date_spot_addresses)
    expect(page).to have_content "#{user.name} (#{change_gender_data_string(user.gender)})さんが作成したデートコースです。"
  end

  scenario "デートコース作成画面で交通手段を徒歩に変更してデートコースを構築後、他のユーザーに公開して登録する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    date_spot_addresses = [address, other_address]
    date_spot_traffic_mode_info_regist(date_spot_addresses, "2022", "03", "04", "WALKING", true)
    click_link "デートコースを探す"
    expect(page).to have_content "デートコース一覧"
    expect(page).to have_content "2022年03月04日にデートの予定"
    date_spot_names_display(date_spot_addresses)
    expect(page).to have_content "#{user.name} (#{change_gender_data_string(user.gender)})さんが作成したデートコースです。"
  end

  scenario "デートコース作成画面で交通手段を自転車に変更してデートコースを構築後、他のユーザーに公開して登録する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    date_spot_addresses = [address, other_address]
    date_spot_traffic_mode_info_regist(date_spot_addresses, "2022", "03", "04", "BICYCLING", true)
    click_link "デートコースを探す"
    expect(page).to have_content "デートコース一覧"
    expect(page).to have_content "2022年03月04日にデートの予定"
    date_spot_names_display(date_spot_addresses)
    expect(page).to have_content "#{user.name} (#{change_gender_data_string(user.gender)})さんが作成したデートコースです。"
  end


  scenario "デートコース作成画面でデートコースを構築後、他のユーザーに非公開にして登録する" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    date_spot_addresses = [address, other_address]
    date_spot_info_regist(date_spot_addresses, "2022", "03", "04", "DRIVING", false)
    click_link "デートコースを探す"
    expect(page).to have_content "デートコース一覧"
    expect(page).to have_content "公開されたデートコースは登録されていません"
  end

  scenario "公開ステータスでデートコース登録確認画面に遷移し再びデートコース作成画面に遷移する。" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    date_spot_addresses = [address, other_address]
    date_spot_info_input(date_spot_addresses, "2022", "03", "04", true)
    click_button "デートコースを登録する"
    result_after_date_course_information("DRIVING", "2022年03月04日", true)
    date_spot_names_display(date_spot_addresses)
    click_link "デートコース作成画面に戻る"
    date_spot_names_display(date_spot_addresses)
  end

  scenario "非公開ステータスでデートコース登録確認画面に遷移し再びデートコース作成画面に遷移する。" do
    user = FactoryBot.create(:user)
    sign_in_as user
    address = FactoryBot.create(:address)
    other_address = FactoryBot.create(:other_address)
    date_spot_addresses = [address, other_address]
    date_spot_info_input(date_spot_addresses, "2022", "03", "04", false)
    click_button "デートコースを登録する"
    result_after_date_course_information("DRIVING", "2022年03月04日", false)
    date_spot_names_display(date_spot_addresses)
    click_link "デートコース作成画面に戻る"
    date_spot_names_display(date_spot_addresses)
  end

  scenario "デートコースを構築後、1番目と3番目のデートスポットの順番を入れ替える" do
  end

end

# 配列を引数として受け取り、デートスポットの数だけ追加する。
def add_date_spot_array(date_spot_addresses_array)
  aggregate_failures do
    date_spot_addresses_array.each do |date_spot_address|
      click_link "デートスポットを探す"
      find("#add_date_course_date_spot_id_#{date_spot_address.date_spot.id}").click
    end
  end
end

# 配列を引数として受け取り、デートスポットの名前があるか確認する
def date_spot_names_display(date_spot_addresses_array)
  aggregate_failures do
    date_spot_addresses_array.each do |date_spot_address|
      expect(page).to have_content "#{date_spot_address.date_spot.name}"
    end
  end
end

def result_after_date_course_information(traffic_mode, scheduled_time, authority)
  aggregate_failures do
    expect(page).to have_content "移動手段は#{traffic_mode_text(traffic_mode)}"
    expect(page).to have_content "デートの日程は#{scheduled_time}です。"
    expect(page).to have_content "#{authority_text(authority)}"
  end
end

def date_spot_info_input(date_spot_addresses, year, month, day, authority)
  aggregate_failures do
    add_date_spot_array(date_spot_addresses)
    fill_in 'date_course_scheduled_time', with: "#{year}-#{month}-#{day}"
    find("#date_course_#{authority}_button").click
  end
end

def date_spot_traffic_mode_change_input(date_spot_addresses, year, month, day, authority, traffic_mode)
  aggregate_failures do
    add_date_spot_array(date_spot_addresses)
    find("#management_traffic_mode").find("option[value='#{traffic_mode}']").select_option
    find("#traffic_mode_change_button").click
    fill_in 'date_course_scheduled_time', with: "#{year}-#{month}-#{day}"
    find("#date_course_#{authority}_button").click
  end
end

def date_spot_info_regist(date_spot_addresses, year, month, day, traffic_mode, authority)
  aggregate_failures do
    date_spot_info_input(date_spot_addresses, year, month, day, authority)
    click_button "デートコースを登録する"
    result_after_date_course_information(traffic_mode, "#{year}年#{month}月#{day}日", authority)
    date_spot_names_display(date_spot_addresses)
    expect do
      click_button "デートコースの登録を決定する"
      date_spot_names_display(date_spot_addresses)
    end.to change(InformationCourse.all, :count).by(date_spot_addresses.length)
  end
end

def date_spot_traffic_mode_info_regist(date_spot_addresses, year, month, day, traffic_mode, authority)
  aggregate_failures do
    date_spot_traffic_mode_change_input(date_spot_addresses, year, month, day, authority, traffic_mode)
    click_button "デートコースを登録する"
    result_after_date_course_information(traffic_mode, "#{year}年#{month}月#{day}日", authority)
    date_spot_names_display(date_spot_addresses)
    expect do
      click_button "デートコースの登録を決定する"
      date_spot_names_display(date_spot_addresses)
    end.to change(InformationCourse.all, :count).by(date_spot_addresses.length)
  end
end