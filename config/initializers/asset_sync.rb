if defined?(AssetSync)
  AssetSync.configure do |config|
    config.fog_provider = 'AWS'
    config.fog_directory = ENV['FOG_DIRECTORY'] # S3バケット名
    config.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID'] # IAMユーザのアクセスキー
    config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY'] # IAMユーザのシークレットキー
    config.aws_session_token = ENV['AWS_SESSION_TOKEN'] if ENV.key?('AWS_SESSION_TOKEN') # 一時的なセキュリティ認証情報を手動で指定する場合にのみ必要です。
    config.fog_region = ENV['AWS_REGION'] #S3パケットのリージョン。
  end
end
