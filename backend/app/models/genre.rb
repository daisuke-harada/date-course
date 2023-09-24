class Genre < ActiveHash::Base
  include ActiveHash::Associations

  has_many :date_spots

  self.data = [
    {id: 1, name: "ショッピングモール"}, {id: 2, name: "飲食店"}, {id: 3, name: "カフェ"},
    {id: 4, name: "アウトドア"}, {id: 5, name: "遊園地"}, {id: 6, name: "水族館"},
    {id: 7, name: "寿司"}, {id: 8, name: "居酒屋"}, {id: 9, name: "焼肉"},
    {id: 10, name: "バーベキュー"}, {id: 11, name: "ランドマーク"}, {id: 12, name: "公園"}
  ]
end
