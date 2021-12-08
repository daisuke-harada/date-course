if defined?(AssetSync)
  AssetSync.configure do |config|
    config.fog_provider = 'AWS'
    config.fog_directory = ENV['FOG_DIRECTORY'] # S3バケット名
    config.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID'] # IAMユーザのアクセスキー
    config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY'] # IAMユーザのシークレットキー
    config.aws_session_token = ENV['AWS_SESSION_TOKEN'] if ENV.key?('AWS_SESSION_TOKEN')
    config.fog_region = 'ap-northeast-1' # S3バケットのリージョン
  end
end
