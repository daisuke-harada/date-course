def spotAndAddressCreate(name, genre_id, opening_time, closing_time, prefecture_id, city_name)
  date_spot = DateSpot.create(name: name, genre_id: genre_id, image: File.open("./public/images/date_spot_images/#{spot_image(genre_id)}"), opening_time: opening_time, closing_time: closing_time)
  Address.create(prefecture_id: prefecture_id, date_spot_id: date_spot.id, city_name: Prefecture.find(prefecture_id).name + city_name)
end

def normal_time(time)
  return "2000-01-01 #{time}"
end

# 深夜0時から5時までの時間帯のデータを入れる際に使用
def midnight__time(time)
  return "2000-01-02 #{time}"
end

def spot_image(id)
  return "#{Genre.find(id).name}.jpg"
end

# 福岡
spotAndAddressCreate("キャナルシティ博多", 1, normal_time("08:00"), normal_time("23:00"), 40, "福岡市博多区住吉1丁目2")
spotAndAddressCreate("つなぐダイニング ZINO 天神店", 8, normal_time("20:00"), midnight__time("05:00"), 40, "福岡市中央区大名1-11-22-1")
spotAndAddressCreate("大濠公園", 12, "", "", 40, "福岡市中央区大濠公園")

#千葉
spotAndAddressCreate("東京ディズニーランド", 5, normal_time("10:00"), normal_time("19:00"), 12, "浦安市舞浜１−１")

# 東京
spotAndAddressCreate("東京スカイツリー", 11, normal_time("10:00"), normal_time("21:00"), 13, "墨田区押上１丁目１−２")
spotAndAddressCreate("恵比寿ガーデンプレイス", 1, normal_time("07:00"), midnight__time("00:00"), 13, "渋谷区恵比寿4丁目20 ガーデンプレイス")

# 熊本
spotAndAddressCreate("あか牛丼いわさき", 2, normal_time("11:00"), midnight__time("00:00"), 43, "阿蘇市乙姫2006-2")
