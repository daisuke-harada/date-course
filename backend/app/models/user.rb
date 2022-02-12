class User < ApplicationRecord
  has_one_attached :image
  has_many :date_spot_reviews, dependent: :destroy

  # ユーザーが他のユーザーをフォローしている状態で退会した場合にrelationshipのデータが一緒に消えるようにdependent: :destroyを追加。
  has_many :relationships, dependent: :destroy
  # 架空のfollowingクラスを作成し、中間テーブルをrelationshipsに設定し、follow_idを参考にしてアクセスする。sourceは出口。
  has_many :followings, through: :relationships, source: :follow

  # relationshipにアクセスする時、follow_idを入り口として使用する。foreign_keyは入り口となる。
  # ユーザーが他のユーザーにフォローされている状態で退会した場合にrelationshipのデータが一緒に消えるようにdependent: :destroyを追加。
  has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id', dependent: :destroy
  has_many :followers, through: :reverse_of_relationships, source: :user

  has_many :courses, dependent: :destroy
  has_one :management, dependent: :destroy

  validates :gender, presence: true

  # 画像ファイルのバリデーション
  validate :image_type
end
