if defined?(AssetSync)
  AssetSync.configure do |config|
<<<<<<< HEAD
    config.fog_provider = 'AWS'
    config.fog_directory = ENV['FOG_DIRECTORY'] # S3バケット名
    config.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID'] # IAMユーザのアクセスキー
    config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY'] # IAMユーザのシークレットキー
    config.aws_session_token = ENV['AWS_SESSION_TOKEN'] if ENV.key?('AWS_SESSION_TOKEN')
    config.fog_region = 'ap-northeast-1' # S3バケットのリージョン
=======
    # config.enabled = false if Rails.env.development? # ここを追記
    config.fog_provider = 'AWS'
    config.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID']
    config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
    config.aws_session_token = ENV['AWS_SESSION_TOKEN'] if ENV.key?('AWS_SESSION_TOKEN')
    # To use AWS reduced redundancy storage.
    # config.aws_reduced_redundancy = true
    #
    # Change AWS signature version. Default is 4
    # config.aws_signature_version = 4
    #
    # Change canned ACL of uploaded object. Default is unset. Will override fog_public if set.
    # Choose from: private | public-read | public-read-write | aws-exec-read |
    #              authenticated-read | bucket-owner-read | bucket-owner-full-control 
    # config.aws_acl = nil 
    #
    # Change host option in fog (only if you need to)
    # config.fog_host =
    #
    # Change port option in fog (only if you need to)
    # config.fog_port = "9000"
    #
    # Use http instead of https. Default should be "https" (at least for fog-aws)
    # config.fog_scheme = "http"
    config.fog_directory = ENV['FOG_DIRECTORY']

    # Invalidate a file on a cdn after uploading files
    # config.cdn_distribution_id = "12345"
    # config.invalidate = ['file1.js']

    # Increase upload performance by configuring your region
    config.fog_region = ENV['AWS_REGION']
    #
    # Set `public` option when uploading file depending on value,
    # Setting to "default" makes asset sync skip setting the option
    # Possible values: true, false, "default" (default: true)
    # config.fog_public = true
    #
    # Don't delete files from the store
    # config.existing_remote_files = "keep"
    #
    # Automatically replace files with their equivalent gzip compressed version
    # config.gzip_compression = true
    #
    # Use the Rails generated 'manifest.yml' file to produce the list of files to
    # upload instead of searching the assets directory.
    # config.manifest = true
    #
    # Upload the manifest file also.
    # config.include_manifest = false
    #
    # Upload files concurrently
    # config.concurrent_uploads = false
    #
    # Path to cache file to skip scanning remote
    # config.remote_file_list_cache_file_path = './.asset_sync_remote_file_list_cache.json'
    #
    # Fail silently.  Useful for environments such as Heroku
    # config.fail_silently = true
    #
    # Log silently. Default is `true`. But you can set it to false if more logging message are preferred.
    # Logging messages are sent to `STDOUT` when `log_silently` is falsy
    # config.log_silently = true
    #
    # Allow custom assets to be cacheable. Note: The base filename will be matched
    # If you have an asset with name `app.0ba4d3.js`, only `app.0ba4d3` will need to be matched
    # config.cache_asset_regexps = [ /\.[a-f0-9]{8}$/i, /\.[a-f0-9]{20}$/i ]
    # config.cache_asset_regexp = /\.[a-f0-9]{8}$/i
    config.run_on_precompile = false
    config.add_local_file_paths do
      public_root = Rails.root.join("public")
      Dir.chdir(public_root) do
        packs_dir = Webpacker.config.public_output_path.relative_path_from(public_root)
        Dir[File.join(packs_dir, '/**/**')]
      end
    end
>>>>>>> s3_asset
  end
end
