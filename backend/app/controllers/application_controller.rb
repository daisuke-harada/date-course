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
      review_total_number: address.date_spot.date_spot_reviews.count,
      average_rate: average_rate_calculation(address.date_spot.date_spot_reviews)
    }
  end

  # 評価の平均値を計算する
  def average_rate_calculation(reviews)
    review_rate_total = 0
    reviews.each{ |review| review_rate_total+=review.rate}
    review_average_rate = review_rate_total == 0? 0: review_rate_total / reviews.length
  end
end
