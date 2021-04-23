Rails.application.routes.draw do
  root 'homes#top'
  get 'homes/top'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
  resources :date_spots do
    resources :date_spot_reviews, only: [:new, :create]
  end
  # このルーティングにより、date_spotから_date_spot_reviewsのネストを浅くする
  resources :date_spot_reviews, only: [:show, :edit, :update, :destroy]
end
