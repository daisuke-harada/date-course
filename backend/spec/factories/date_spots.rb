# == Schema Information
#
# Table name: date_spots
#
#  id           :bigint           not null, primary key
#  closing_time :datetime
#  image        :string(255)
#  name         :string(255)
#  opening_time :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  genre_id     :integer
#
# Indexes
#
#  index_date_spots_on_genre_id_and_created_at  (genre_id,created_at)
#
FactoryBot.define do
  factory :date_spot do
    id { 1 }
    name { "キャナルシティ博多" }
    genre_id { Genre.find_by(id: 1).id }
    opening_time { "2000-01-01 08:00:00 UTC" }
    closing_time { "2000-01-01 23:00:00 UTC" }
  end

  factory :other_spot, class: DateSpot do
    id { 2 }
    name { "つなぐダイニング ZINO 天神店" }
    genre_id { Genre.find_by(id: 8).id }
    opening_time { "2000-01-01 08:00:00 UTC" }
    closing_time { "2000-01-01 23:00:00 UTC" }
  end
end
