class User < ApplicationRecord
  #データベースに保存される直前にすべての文字列を小文字に変換する一意性を確実にするために
  before_save {self.email = email.downcase}
  validates :name, presence: true, length: {maximum: 50}
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 250}, 
            format: { with: VALID_EMAIL_REGEX},
            #一意性
            uniqueness: true
  # validates :sex, presence: true
  # validates :password_digest, presence: true
  # validates :remember_digest, presence: true
end
