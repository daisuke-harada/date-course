class RegistrationSerializer < ActiveModel::Serializer
  # User オブジェクトには user メソッドが存在しないため
  attribute :user do
    UserSerializer.new(object).attributes
  end

  attribute :status do
    :created
  end

  attribute :login_status do
    true
  end
end
