CarrierWave.configure do |config|
  if Rails.env.production?
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: Rails.application.credentials[:AWS_ACCESS_KEY_ID],
      aws_secret_access_key: Rails.application.credentials[:AWS_SECRET_ACCESS_KEY],
      region: 'ap-northeast-1'
    }

    config.fog_directory  = Rails.application.credentials[:FOG_DIRECTORY]
    config.cache_storage = :fog
  else
    config.asset_host = "http://localhost:7777"
    config.storage = :file
    config.cache_storage = :file
  end
end
