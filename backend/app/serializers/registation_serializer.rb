class RegistationSerializer < ActiveModel::Serializer
  attributes :status, :login_status, :user

  def status
    :created
  end

  def login_status
    true
  end

  # User オブジェクトには user メソッドが存在しないため
  def user
    UserSerializer.new(object).attributes
  end
end
