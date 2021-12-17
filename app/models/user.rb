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

  # 仮想の属性を作成 データベースに保存せず、一定期間だけ用いたい属性
  attr_accessor :remember_token

  # データベースに保存される直前にすべての文字列を小文字に変換する一意性を確実にするために
  before_save { self.email = email.downcase }
  validates :name, presence: true, length: { maximum: 50 }, uniqueness: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 250 },
                    format: { with: VALID_EMAIL_REGEX },
                    # 一意性
                    uniqueness: true
  # パスワードをハッシュ化する。
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  validates :sex, presence: true

  # 画像ファイルのバリデーション
  validate :image_type

  def change_sex_data_string
    sex == 1 ? "男" : "女"
  end

  # 渡された文字列のハッシュを返す
  def self.digest(string)
    cost = if ActiveModel::SecurePassword.min_cost
             BCrypt::Engine::MIN_COST
           else
             BCrypt::Engine.cost
           end
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  # 永続セッションのためにユーザーをデータベースに記憶する
  def remember
    # update_attributeメソッドはバリデーションを素通りさせる
    self.remember_token = User.new_token
    # 記憶ダイジェストを更新する。自動ログイン機能に使用する。
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  def authenticated?(remember_token)
    return false if remember_digest.nil?

    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  # フォロー機能のメソッド
  def follow(other_user)
    relationships.find_or_create_by(follow_id: other_user.id) unless self == other_user
  end

  def unfollow(other_user)
    relationship = relationships.find_by(follow_id: other_user.id)
    relationship.destroy if relationship
  end

  def following?(other_user)
    followings.include?(other_user)
  end
end
