User.create(name: "guest", email: "guest@gmail.com", gender: '男', password: "foobar", password_confirmation: "foobar")
User.create(name: "daisuke", email: "daisuke@gmail.com", gender: '男', password: "daisuke", password_confirmation: "daisuke")
User.create(name: "kenta", email: "kenta@gmail.com", gender: '男', password: "kentakenta", password_confirmation: "kentakenta")
User.create(name: "marika", email: "marika@gmail.com", gender: '女', password: "marika", password_confirmation: "marika")
User.create(name: "admin", email: "adminstrator@gmail.com", gender: '男', password: "adminadmin", password_confirmation: "adminadmin", admin: true)

DateSpot.create(id: 1, name: "キャナルシティ博多", genre_id: 1, opening_time: "2000-01-01 08:00", closing_time: "2000-01-01 23:00")
Address.create(prefecture_id: 40, date_spot_id: 1, city_name: Prefecture.find(40).name + "福岡市博多区住吉1丁目2")

DateSpot.create(id: 2, name: "つなぐダイニング ZINO 天神店", genre_id: 8, opening_time: "2000-01-01 20:00", closing_time: "2000-01-02 05:00")
Address.create(prefecture_id: 40, date_spot_id: 2, city_name: Prefecture.find(40).name + "福岡市中央区大名1-11-22-1")
