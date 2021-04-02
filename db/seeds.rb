#環境別にseedファイルを読み込む
load(Rails.root.join("db", "seeds", "#{Rails.env.downcase}.rb"))