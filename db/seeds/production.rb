# userデータ
User.create(name: "guest", email: "guest@gmail.com", gender: 1, password: "foobar", password_confirmation: "foobar")
User.create(name: "daisuke", email: "daisuke@gmail.com", gender: 1, password: "foobar", password_confirmation: "foobar")
User.create(name: "kenta", email: "kenta@gmail.com", gender: 1, password: "foobar", password_confirmation: "foobar")
User.create(name: "admin", email: "adminstrator@gmail.com", gender: 1, password: "adminlogin1099", password_confirmation: "adminlogin1099", admin: true)

# date_spotデータとaddressデータ
DateSpot.create(id: 1, name: "キャナルシティ博多", genre_id: 1, opening_time: "2000-01-01 08:00", closing_time: "2000-01-01 23:00")
DateSpot.find_by(id: 1).image.attach(io: File.open('app/assets/images/date_spot_images/canal.jpeg'),
                                     filename: 'canal.jpeg')
Address.create(prefecture_id: 40, date_spot_id: 1, city_name: "福岡市博多区住吉１丁目２")

DateSpot.create(id: 2, name: "つなぐダイニング ZINO 天神店", genre_id: 8, opening_time: "2000-01-01 20:00", closing_time: "2000-01-02 05:00")
DateSpot.find_by(id: 2).image.attach(io: File.open('app/assets/images/date_spot_images/tunagu_zino_hukuoka.jpeg'),
                                     filename: 'tunagu_zino_hukuoka.jpeg')
Address.create(prefecture_id: 40, date_spot_id: 2, city_name: "福岡市中央区大名１-１１-２２-１")

DateSpot.create(id: 3, name: "東京ディズニーランド", genre_id: 5, opening_time: "2000-01-01 10:00", closing_time: "2000-01-01 19:00")
DateSpot.find_by(id: 3).image.attach(io: File.open('app/assets/images/date_spot_images/disny.jpeg'),
                                     filename: 'disney.jpeg')
Address.create(prefecture_id: 12, date_spot_id: 3, city_name: "浦安市舞浜１−１")

DateSpot.create(id: 4, name: "東京スカイツリー", genre_id: 11, opening_time: "2000-01-01 10:00", closing_time: "2000-01-01 21:00")
DateSpot.find_by(id: 4).image.attach(io: File.open('app/assets/images/date_spot_images/sky_tree.jpeg'),
                                     filename: 'sky_tree.jpeg')
Address.create(prefecture_id: 13, date_spot_id: 4, city_name: "墨田区押上1-1-2")

DateSpot.create(id: 5, name: "恵比寿ガーデンプレイス", genre_id: 1, opening_time: "2000-01-01 07:00", closing_time: "2000-01-02 00:00")
DateSpot.find_by(id: 5).image.attach(io: File.open('app/assets/images/date_spot_images/garden_place.jpeg'),
                                     filename: 'garden_place.jpeg')
Address.create(prefecture_id: 13, date_spot_id: 5, city_name: "渋谷区恵比寿４丁目２０ ガーデンプレイス")
