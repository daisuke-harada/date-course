class SessionsSerializer < ActiveModel::Serializer
  attribute :login_status do
    true
  end

  attribute :user do
    UserSerializer.new(object).attributes
  end
end
