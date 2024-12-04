class ErrorSerializer < ActiveModel::Serializer
  attribute :error_messages do
    object.errors.messages
  end
end
