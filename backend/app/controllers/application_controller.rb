class ApplicationController < ActionController::API
  # 評価の平均値を計算する
  def average_rate_calculation(reviews)
    review_rate_total = 0
    reviews.each { |review| review_rate_total += review.rate }
    (review_rate_total == 0) ? 0 : review_rate_total / reviews.length
  end

  # デートコース関連
  # コース内のデートスポットの情報を配列にして返す
  def during_address_and_date_spots(course)
    course.during_spots.map do |during_spot|
      Address.find_by(date_spot_id: during_spot.date_spot_id).address_and_date_spot_and_genre_name
    end
  end

  # コース内のルート範囲の県名を返す
  def course_prefecture_names_no_duplicate(course)
    prefecture_name = course.during_spots.map do |during_spot|
      # during_spotから県名を取り出す
      Prefecture.find(Address.find_by(date_spot_id: during_spot.date_spot_id).prefecture_id).name
    end

    # 県名の重複をなくして返す
    prefecture_name.uniq
  end
end
