class Area < ActiveHash::Base
  include ActiveHash::Associations
  #prefectureクラスとactive_hash同士のアソシエーションを結ぶ
  has_many :prefectures

  self.data = [
    {name: '北海道・東北'},{name: '関東'},{name: '中部'},
    {name: '関西'},{name: '中国・四国'},{name: '九州・沖縄'}
  ]
end