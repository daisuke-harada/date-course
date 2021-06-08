Rails.application.routes.draw do
  root 'homes#top'
  get 'homes/top'
  get 'filter/search'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
  resources :date_spots do
    resources :date_spot_reviews, only: [:new]
  end
  # このルーティングにより、date_spotから_date_spot_reviewsのネストを浅くする
  resources :date_spot_reviews, only: [:create, :edit, :update, :destroy]
  resources :relationships, only: [:create, :destroy]
end
