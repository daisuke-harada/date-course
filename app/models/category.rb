class Category < ActiveHash::Base
  include ActiveHash::Associations

  has_many :date_spot
  
  self.date = [
    {id:1, name: 'ショッピングモール'}, {id:2, name: '寿司'}, {id:3, name: '飲食店'},
    {id:4, name: 'カフェ'},　{id:5, name: '居酒屋'},　{id:6, name: '焼肉'},　{id:7, name: 'バーベキュー'}
  ]
end