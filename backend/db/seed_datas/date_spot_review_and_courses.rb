rates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

def date_spot_review_create(rate, content, user_id, date_spot_id)
  DateSpotReview.create(rate: rate, content: content, user_id: user_id, date_spot_id: date_spot_id)
end

#すべてのユーザーにすべてのデートスポットをレビューさせる
User.where(admin: false).each do |user|
  Address.all.each do |address|
    date_spot_review_create(rates.sample, "test"*18, user.id, address.date_spot_id)
  end
end

#デートコース作成
Course.create(id: 1, user_id: 1, travel_mode: "DRIVING", authority: "公開")
DuringSpot.create(course_id: 1, date_spot_id: 1)
DuringSpot.create(course_id: 1, date_spot_id: 3)
DuringSpot.create(course_id: 1, date_spot_id: 2)

Course.create(id: 2, user_id: 2, travel_mode: "DRIVING", authority: "公開")
DuringSpot.create(course_id: 2, date_spot_id: 1)
DuringSpot.create(course_id: 2, date_spot_id: 2)
DuringSpot.create(course_id: 2, date_spot_id: 7)
DuringSpot.create(course_id: 2, date_spot_id: 3)
