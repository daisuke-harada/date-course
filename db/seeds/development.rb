# userデータ
User.create(name: "guest", email: "guest@gmail.com", sex: 1, password: "foobar", password_confirmation: "foobar")
User.create(name: "daisuke", email: "daisuke@gmail.com", sex: 1, password: "foobar", password_confirmation: "foobar")
User.create(name: "kenta", email: "kenta@gmail.com", sex: 1, password: "foobar", password_confirmation: "foobar")
User.create(name: "admin", email: "adminstrator@gmail.com", sex: 1, password: "adminlogin1099", password_confirmation: "adminlogin1099", admin: true)

# date_spotデータとaddressデータ
DateSpot.create(name: "キャナルシティ", genre_id: 1, opening_time: "08:00", closing_time: "23:00")
DateSpot.find_by(name: "キャナルシティ").image.attach(io: File.open('app/assets/images/date_spot_images/canal.jpeg'),
                                                    filename: 'canal.jpeg')
Address.create(prefecture_id: 40, date_spot_id: 1, city_name: "福岡県福岡市博多区住吉１丁目２")