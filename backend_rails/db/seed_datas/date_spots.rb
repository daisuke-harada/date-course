def spotAndAddressCreate(name, genre_id, opening_time, closing_time, prefecture_id, city_name)
  date_spot = DateSpot.create(name: name, genre_id: genre_id, image: File.open("./public/images/date_spot_images/#{spot_image(genre_id)}"), opening_time: opening_time, closing_time: closing_time)
  Address.create(prefecture_id: prefecture_id, date_spot_id: date_spot.id, city_name: Prefecture.find(prefecture_id).name + city_name)
end

def normal_time(time)
  "2000-01-01 #{time}"
end

# 深夜0時から5時までの時間帯のデータを入れる際に使用
def midnight__time(time)
  "2000-01-02 #{time}"
end

def spot_image(id)
  "#{Genre.find(id).name}.jpg"
end

# 東京 1〜6
spotAndAddressCreate("東京スカイツリー", 11, normal_time("10:00"), normal_time("21:00"), 13, "墨田区押上１丁目１−２")
spotAndAddressCreate("恵比寿ガーデンプレイス", 1, normal_time("07:00"), midnight__time("00:00"), 13, "渋谷区恵比寿4丁目20 ガーデンプレイス")
spotAndAddressCreate("プレゴ・プレゴ", 2, normal_time("16:00"), normal_time("23:00"), 13, "新宿区新宿3-31-3 ＮＳプラザ中央　4F")
spotAndAddressCreate("酒場シナトラ 東京駅店", 9, normal_time("11:00"), normal_time("23:00"), 13, "千代田区丸の内１丁目９−１ 東京駅一番街 2階")
spotAndAddressCreate("カフェ バッハ", 3, normal_time("10:00"), normal_time("19:00"), 13, "台東区日本堤１丁目２３−９")
spotAndAddressCreate("おもてなしとりよし 西新宿店", 2, normal_time("17:00"), normal_time("23:00"), 13, "新宿区西新宿1-10-2 110ビル 11F")

# 千葉 7
spotAndAddressCreate("東京ディズニーランド", 5, normal_time("10:00"), normal_time("19:00"), 12, "浦安市舞浜１−１")

# 大阪 8〜13
spotAndAddressCreate("純喫茶 アメリカン", 3, normal_time("09:00"), normal_time("22:00"), 27, "大阪市中央区道頓堀１丁目７−４")
spotAndAddressCreate("ユニバーサル・スタジオ・ジャパン", 5, normal_time("11:00"), normal_time("19:00"), 27, "大阪市此花区桜島２丁目１−３３")
spotAndAddressCreate("焼肉Lab 梅田店", 9, normal_time("12:00"), normal_time("23:00"), 27, "大阪市曽根崎2-10-21 第3河合ビル3F")
spotAndAddressCreate("居酒屋 牡蠣 やまと", 8, normal_time("16:00"), normal_time("23:00"), 27, "大阪市阿倍野区旭町2-1-2 あべのポンテ1F")
spotAndAddressCreate("創蔵", 7, normal_time("17:00"), normal_time("22:00"), 27, "大阪市中央区難波4-6-10")
spotAndAddressCreate("りんくうプレミアム・アウトレット", 1, normal_time("11:00"), normal_time("21:00"), 27, "泉佐野市りんくう往来南３−２８")

# 京都府 14〜19
spotAndAddressCreate("京都タワー", 11, normal_time("09:00"), normal_time("21:00"), 26, "京都市下京区烏丸通七条下る 東塩小路町 721-1")
spotAndAddressCreate("ウメ子の家 四条河原町店", 2, normal_time("17:00"), normal_time("23:00"), 26, "京都市下京区四条小橋東入橋本町105 PONTOビル2F")
spotAndAddressCreate("CINQUE IKARIYA（チンクエイカリヤ）", 2, normal_time("17:00"), normal_time("22:00"), 26, "京都市中京区突抜町138-3")
spotAndAddressCreate("京都 焼き鳥 一", 2, normal_time("17:00"), normal_time("22:00"), 26, "京都市中京区四条室町菊水鉾町585 1F")
spotAndAddressCreate("京都円山　天正", 9, normal_time("17:00"), normal_time("22:00"), 26, "京都市東山区祇園町北側338")
spotAndAddressCreate("Walden Woods Kyoto", 3, normal_time("08:00"), normal_time("19:00"), 26, "京都市下京区栄町５０８−１")

# 神奈川 20〜25
spotAndAddressCreate("横浜ランドマークタワー", 11, "", "", 14, "横浜市西区みなとみらい２丁目２−１")
spotAndAddressCreate("横浜・八景島シーパラダイス", 6, normal_time("11:00"), normal_time("17:00"), 14, "横浜市金沢区八景島")
spotAndAddressCreate("よこはまコスモワールド", 5, normal_time("11:00"), normal_time("21:00"), 14, "横浜市中区新港２丁目８−１")
spotAndAddressCreate("海の公園 バーベキュー場", 10, normal_time("10:00"), normal_time("19:00"), 14, "横浜市金沢区海の公園１０")
spotAndAddressCreate("新横浜ラーメン博物館", 2, normal_time("11:00"), normal_time("21:00"), 14, "横浜市港北区新横浜２丁目１４−２１")
spotAndAddressCreate("旅情個室空間 酒の友 新横浜店", 8, normal_time("17:00"), normal_time("21:00"), 14, "横浜市港北区新横浜3-17-15 3F")

# 愛知 26〜31
spotAndAddressCreate("名古屋港水族館", 6, normal_time("09:30"), normal_time("17:30"), 23, "名古屋市港区港町1-3")
spotAndAddressCreate("博物館 明治村", 2, normal_time("09:30"), normal_time("17:00"), 23, "犬山市内山1")
spotAndAddressCreate("茶寮 花の宴", 2, normal_time("11:30"), normal_time("22:00"), 23, "安城市大東町１７−８")
spotAndAddressCreate("食堂うさぎや", 2, normal_time("11:00"), normal_time("14:00"), 23, "名古屋市名東区高社２丁目９７")
spotAndAddressCreate("THE ONE AND ONLY", 8, normal_time("18:00"), midnight__time("01:00"), 23, "名古屋市西区牛島町６−１ 名古屋ルーセントタワ 40F")
spotAndAddressCreate("完全個室ダイニング カーヴ隠れや 名古屋駅店", 8, normal_time("17:30"), midnight__time("02:00"), 23, "名古屋市中村区名駅３丁目１５−１１ Ｍ三ダイニングビル 4F")

# 福岡 32〜37
spotAndAddressCreate("キャナルシティ博多", 1, normal_time("08:00"), normal_time("23:00"), 40, "福岡市博多区住吉1丁目2")
spotAndAddressCreate("つなぐダイニング ZINO 天神店", 8, normal_time("20:00"), midnight__time("05:00"), 40, "福岡市中央区大名1-11-22-1")
spotAndAddressCreate("大濠公園", 12, "", "", 40, "福岡市中央区大濠公園")
spotAndAddressCreate("マリンワールド海の中道", 6, "", "", 40, "福岡市東区西戸崎18-28")
spotAndAddressCreate("麺劇場 玄瑛", 2, normal_time("11:30"), normal_time("21:00"), 40, "福岡市中央区薬院 2-16-3")
spotAndAddressCreate("芥屋の大門", 4, "", "", 40, "糸島市志摩芥屋６７５－２")

# 熊本 38
spotAndAddressCreate("あか牛丼いわさき", 2, normal_time("11:00"), midnight__time("00:00"), 43, "阿蘇市乙姫2006-2")
