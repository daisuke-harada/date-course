class ApplicationController < ActionController::API

  # user情報をJSONで渡す際に、フォローしたユーザーのidとフォローされたユーザーのidを返せるようにする。
  def user_and_userFollowingsAndFollowers(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      image: user.image,
      admin: user.admin,
      password_digest: user.password_digest,
      following_ids: user.followings.ids,
      follower_ids: user.followers.ids,
    }
  end

  # addressとDateSpotとgenre名を結合したデータを作成する
  def address_and_date_spot_and_genre_name(address)
    {
      id: address.id,
      city_name: address.city_name,
      prefecture_name: Prefecture.find(address.prefecture_id).name,
      date_spot: address.date_spot,
      genre_name: address.date_spot.genre.name,
      latitude: address.latitude,
      longitude: address.longitude,
      review_total_number: DateSpotReview.where(date_spot_id: address.date_spot.id).count,
      average_rate: average_rate_calculation(DateSpotReview.where(date_spot_id: address.date_spot.id))
    }
  end

  # 評価の平均値を計算する
  def average_rate_calculation(reviews)
    review_rate_total = 0
    reviews.each{ |review| review_rate_total+=review.rate}
    review_rate_total == 0? 0: review_rate_total / reviews.length
  end

  # デートコース関連
  # コース内のデートスポットの情報を配列にして返す
  def during_address_and_date_spots(course)
    return course.during_spots.map do |during_spot|
      address_and_date_spot_and_genre_name(Address.find_by(date_spot_id: during_spot.date_spot_id))
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

  # コース情報を返す
  def course_info(course)
    return {
      id: course.id,
      user: user_and_userFollowingsAndFollowers(User.find(course.user_id)),
      travel_mode: course.travel_mode,
      authority: course.authority,
      course_during_spots: during_address_and_date_spots(course),
      no_duplicate_prefecture_names: course_prefecture_names_no_duplicate(course)
    }
  end
end
