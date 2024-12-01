# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE)
#  email           :string
#  gender          :string
#  image           :string
#  name            :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#  index_users_on_name   (name) UNIQUE
#
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
  has_many :reverse_of_relationships, class_name: "Relationship", foreign_key: "follow_id", dependent: :destroy
  has_many :followers, through: :reverse_of_relationships, source: :user
  has_many :courses, dependent: :destroy

  validates :name, presence: true, length: {maximum: 50}, uniqueness: true
  validates :password, presence: true, length: {minimum: 6}, allow_nil: true
  validates :gender, presence: true
  validates :email, presence: true, length: {maximum: 250}
  validates :email, uniqueness: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  scope :non_admins, -> { where(admin: false) }
  # ransackで絞り込みたい際には許可するモデルを書く必要がある
  def self.ransackable_attributes(auth_object = nil)
    ["admin", "created_at", "email", "gender", "id", "image", "name", "password_digest", "updated_at"]
  end

  # ransackで絞り込みたい際には許可するモデルを書く必要がある
  # まとめて書くことはできず、絞り込みの条件ごとに書く必要がある
  def self.ransackable_associations(auth_object = nil)
    ["course", "date_spot"]
  end

  # フォロー機能のメソッド
  def follow(other_user)
    relationships.find_or_create_by(follow_id: other_user.id) unless self == other_user
  end

  def unfollow(other_user)
    relationship = relationships.find_by(follow_id: other_user.id)
    relationship&.destroy
  end
end
