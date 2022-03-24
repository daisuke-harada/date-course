User.create(name: 'guest', email: 'guest@gmail.com', gender: '男性', password: 'foobar', password_confirmation: 'foobar')
User.create(name: 'daisuke', email: 'daisuke@gmail.com', gender: '男性', password: 'daisuke', password_confirmation: 'daisuke')
User.create(name: 'peter', email: 'kenta@gmail.com', gender: '男性', image: File.open('./public/images/user_images/spiderman.png'), password: 'foobar', password_confirmation: 'foobar')
User.create(name: 'marika', email: 'marika@gmail.com', gender: '女性', password: 'marika', password_confirmation: 'marika')
User.create(name: 'admin', email: 'adminstrator@gmail.com', gender: '男性', password: 'adminadmin', password_confirmation: 'adminadmin', admin: true)

DateSpot.create(id: 1, name: 'キャナルシティ博多', genre_id: 1, image: File.open('./public/images/date_spot_images/canal.jpeg'), opening_time: '2000-01-01 08:00', closing_time: '2000-01-01 23:00')
Address.create(prefecture_id: 40, date_spot_id: 1, city_name: Prefecture.find(40).name + '福岡市博多区住吉1丁目2')

DateSpot.create(id: 2, name: 'つなぐダイニング ZINO 天神店', genre_id: 8, image: File.open('./public/images/date_spot_images/tunagu_zino_hukuoka.jpeg'), opening_time: '2000-01-01 20:00', closing_time: '2000-01-02 05:00')
Address.create(prefecture_id: 40, date_spot_id: 2, city_name: Prefecture.find(40).name + '福岡市中央区大名1-11-22-1')

DateSpot.create(id: 3, name: "東京ディズニーランド", genre_id: 5, image: File.open('./public/images/date_spot_images/disny.jpeg'), opening_time: "2000-01-01 10:00", closing_time: "2000-01-01 19:00")
Address.create(prefecture_id: 12, date_spot_id: 3, city_name: Prefecture.find(12).name + "浦安市舞浜1-1")

DateSpot.create(id: 4, name: "東京スカイツリー", genre_id: 11, image: File.open('./public/images/date_spot_images/sky_tree.jpeg'), opening_time: "2000-01-01 10:00", closing_time: "2000-01-01 21:00")
Address.create(prefecture_id: 13, date_spot_id: 4, city_name: Prefecture.find(13).name + "墨田区押上1-1-2")

DateSpot.create(id: 5, name: "恵比寿ガーデンプレイス", genre_id: 1, image: File.open('./public/images/date_spot_images/garden_place.jpeg'), opening_time: "2000-01-01 07:00", closing_time: "2000-01-02 00:00")
Address.create(prefecture_id: 13, date_spot_id: 5, city_name: Prefecture.find(13).name + "渋谷区恵比寿4丁目20 ガーデンプレイス")

DateSpot.create(id: 6, name: "あか牛丼いわさき", genre_id: 2, image: File.open('./public/images/date_spot_images/aka_ushi_iwasaki.jpg'), opening_time: "2000-01-01 11:00", closing_time: "2000-01-02 00:00")
Address.create(prefecture_id: 43, date_spot_id: 6, city_name: Prefecture.find(43).name + "阿蘇市乙姫2006-2")
