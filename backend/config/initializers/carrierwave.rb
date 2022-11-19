CarrierWave.configure do |config|
  if Rails.env.production?
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = ENV["FOG_DIRECTORY"]
    config.fog_public = false
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: Rails.application.credentials[:AWS_ACCESS_KEY_ID],
      aws_secret_access_key: Rails.application.credentials[:AWS_SECRET_ACCESS_KEY],
      region: 'ap-northeast-1',
      path_style: true
    }
  else
    config.asset_host = "http://localhost:7777"
    config.storage = :file
    config.cache_storage = :file
  end
end
