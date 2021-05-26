class Genre < ActiveHash::Base
  include ActiveHash::Associations

  has_many :date_spots

  self.data = [
    {id: 1, name: 'ショッピングモール'}, {id: 2, name: '寿司'}, {id: 3, name: '飲食店'},
    {id: 4, name: 'カフェ'}, {id: 5, name: '居酒屋'}, {id: 6, name: '焼肉'}, {id: 7, name: 'バーベキュー'},
    {id: 8, name: '遊園地'}, {id: 9, name: 'ランドマーク'}
  ]
end