#環境別にseedファイルを読み込む
User.create(name: "guest", email: "guest@gmail.com", sex: 1, password: "foobar", password_confirmation: "foobar")
User.create(name: "daisuke", email: "daisuke@gmail.com", sex: 1, password: "foobar", password_confirmation: "foobar")
User.create(name: "admin", email: "adminstrator@gmail.com", sex: 1, password: "adminlogin1099", password_confirmation: "adminlogin1099", admin: true)
