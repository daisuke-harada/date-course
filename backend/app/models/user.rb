class User < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_secure_password
  has_many :date_spot_reviews, dependent: :destroy

  # ユーザーが他のユーザーをフォローしている状態で退会した場合にrelationshipのデータが一緒に消えるようにdependent: :destroyを追加。
  has_many :relationships, dependent: :destroy
  # # 架空のfollowingクラスを作成し、中間テーブルをrelationshipsに設定し、follow_idを参考にしてアクセスする。sourceは出口。
  has_many :followings, through: :relationships, source: :follow

  # relationshipにアクセスする時、follow_idを入り口として使用する。foreign_keyは入り口となる。
  # ユーザーが他のユーザーにフォローされている状態で退会した場合にrelationshipのデータが一緒に消えるようにdependent: :destroyを追加。
  has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id', dependent: :destroy
  has_many :followers, through: :reverse_of_relationships, source: :user

  validates :name, presence: true, length: { maximum: 50 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
  validates :gender, presence: true
  validates :email, presence: true, length: { maximum: 250 }
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
