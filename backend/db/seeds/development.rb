rates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

def spot_image(id)
  return "#{Genre.find(id).name}.jpg"
end

def normal_time(time)
  return "2000-01-01 #{time}"
end

# 深夜0時から5時までの時間帯のデータを入れる際に使用
def midnight__time(time)
  return "2000-01-02 #{time}"
end

def SpotAndAddressCreate(name, genre_id, opening_time, closing_time, prefecture_id, city_name)
  date_spot = DateSpot.create(name: name, genre_id: genre_id, image: File.open("./public/images/date_spot_images/#{spot_image(genre_id)}"), opening_time: opening_time, closing_time: closing_time)
  Address.create(prefecture_id: prefecture_id, date_spot_id: date_spot.id, city_name: Prefecture.find(prefecture_id).name + city_name)
end

def date_spot_review_create(rate, content, user_id, date_spot_id)
  DateSpotReview.create(rate: rate, content: content, user_id: user_id, date_spot_id: date_spot_id)
end

User.create(name: "guest", email: "guest@gmail.com", gender: "男性", image: File.open("./public/images/user_images/spiderman.png"), password: "foobar", password_confirmation: "foobar")
User.create(name: "daisuke", email: "daisuke@gmail.com", gender: "男性", password: "daisuke", password_confirmation: "daisuke")
User.create(name: "peter", email: "kenta@gmail.com", gender: "男性", image: File.open("./public/images/user_images/spiderman.png"), password: "foobar", password_confirmation: "foobar")
User.create(name: "marika", email: "marika@gmail.com", gender: "女性", password: "marika", password_confirmation: "marika")
User.create(name: "admin", email: "adminstrator@gmail.com", gender: "男性", password: "adminadmin", password_confirmation: "adminadmin", admin: true)

# 福岡
SpotAndAddressCreate("キャナルシティ博多", 1, normal_time("08:00"), normal_time("23:00"), 40, "福岡市博多区住吉1丁目2")
SpotAndAddressCreate("つなぐダイニング ZINO 天神店", 8, normal_time("20:00"), midnight__time("05:00"), 40, "福岡市中央区大名1-11-22-1")
SpotAndAddressCreate("大濠公園", 12, "", "", 40, "福岡市中央区大濠公園")

# 東京
SpotAndAddressCreate("東京ディズニーランド", 5, normal_time("10:00"), normal_time("19:00"), 12, "墨田区押上1-1-2")
SpotAndAddressCreate("東京スカイツリー", 11, normal_time("10:00"), normal_time("21:00"), 13, "渋谷区恵比寿4丁目20 ガーデンプレイス")
SpotAndAddressCreate("恵比寿ガーデンプレイス", 1, normal_time("07:00"), midnight__time("00:00"), 13, "渋谷区恵比寿4丁目20 ガーデンプレイス")

# 熊本
SpotAndAddressCreate("あか牛丼いわさき", 2, normal_time("11:00"), midnight__time("00:00"), 43, "阿蘇市乙姫2006-2")

#guestにすべてのデートスポットをレビューさせる
Address.all.each do |address|
  date_spot_review_create(rates.sample, "testtesttesttest", 1, address.date_spot_id)
end

Address.all.each do |address|
  date_spot_review_create(rates.sample, "testtesttesttest", 2, address.date_spot_id)
end

Address.all.each do |address|
  date_spot_review_create(rates.sample, "testtesttesttest", 3, address.date_spot_id)
end

Address.all.each do |address|
  date_spot_review_create(rates.sample, "testtesttesttest", 4, address.date_spot_id)
end