if Rails.env === "production"
  # 本番環境用
  # Rails.application.config.session_store :cookie_store, key: 'date-course-api ', domain: #'フロントエンドのドメイン'
else
  # 開発環境用
  Rails.application.config.session_store :cookie_store, key: "date-course-api "
end
