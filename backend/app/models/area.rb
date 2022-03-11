class Area < ActiveHash::Base
  include ActiveHash::Associations
  # prefectureクラスとactive_hash同士のアソシエーションを結ぶ
  has_many :prefectures

  self.data = [
    {id: 1, name: '北海道・東北' }, {id: 2, name: '関東' }, {id: 3, name: '中部' },
    {id: 4, name: '関西' }, {id: 5, name: '中国・四国' }, {id: 6, name: '九州・沖縄' }
  ]
end
