class FailureSessionsSerializer < ActiveModel::Serializer
  attribute :login_status do
    false
  end

  attribute :status do
    401
  end

  attribute :error_messages do
    ["認証に失敗しました。", "正しい名前・パスワードを入力し直すか、新規登録を行ってください。"]
  end
end
