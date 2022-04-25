rates = [2, 2.5, 3, 3.5, 4, 4.5, 5]

def date_spot_review_create(rate, content, user_id, date_spot_id)
  DateSpotReview.create(rate: rate, content: content, user_id: user_id, date_spot_id: date_spot_id)
end

def date_spot_id_array_shuffle(date_spot_id_array)
  date_spot_id_array.shuffle
end

def course_create(user_ids, date_spot_id_array, travel_mode)
  User.where(id: user_ids).each do |user|
    date_spot_ids = date_spot_id_array_shuffle(date_spot_id_array)
    course = Course.create(user_id: user.id, travel_mode: travel_mode, authority: "公開")
    DuringSpot.create(course_id: course.id, date_spot_id: date_spot_ids[0])
    DuringSpot.create(course_id: course.id, date_spot_id: date_spot_ids[1])
    DuringSpot.create(course_id: course.id, date_spot_id: date_spot_ids[3])
  end
end

#すべてのユーザーにランダムに5つレビューを投稿してもらう
User.where(admin: false).each do |user|
  (1..5).each do
    date_spot_review_create(rates.sample, "test"*18, user.id, Address.find(rand(1..38)).date_spot_id)
  end
end

# デートコース作成
course_create(2..6, [*1..6], "DRIVING")
course_create(4..6, [*1..7], "DRIVING")
course_create(7..11, [*8..13], "BICYCLING")
course_create(9..11, [*8..19], "DRIVING")
course_create(12..16, [*8..19], "DRIVING")
course_create(14..16, [*20..25], "WALKING")
course_create(17..20, [*26..31], "DRIVING")
course_create(21..25, [*32..37], "DRIVING")
course_create(26..30, [*32..38], "DRIVING")
