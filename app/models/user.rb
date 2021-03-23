class User < ApplicationRecord
  #データベースに保存される直前にすべての文字列を小文字に変換する一意性を確実にするために
  before_save {self.email = email.downcase}
  validates :name, presence: true, length: {maximum: 50}
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 250}, 
            format: { with: VALID_EMAIL_REGEX},
            #一意性
            uniqueness: true
  #パスワードをハッシュ化する。
  has_secure_password
  validates :password, presence: true, length: {minimum: 6}
  validates :sex, presence: true
  
  has_one_attached :profile_image

  def sex_status
    return sex == 1 ? "男": "女"
  end

  //渡された文字列のハッシュを返す
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  
  def User.new_token
    SecureRandom.urlsafe_base64
  end
end
