class ErrorSerializer < ActiveModel::Serializer
  attributes :status, :error_messages

  def status
    500
  end

  def error_messages
    object.errors.messages
  end
end
