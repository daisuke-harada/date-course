Rails.application.routes.draw do
  root 'homes#top'
  get 'homes/top'
  get 'filter/search'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users do
    get 'followings' => 'relationships#followings', as: 'followings'
    get 'followers' => 'relationships#followers', as: 'followers'
  end
  resources :date_spots do
    resources :date_spot_reviews, only: [:new]
  end
  # このルーティングにより、date_spotから_date_spot_reviewsのネストを浅くする
  resources :date_spot_reviews, only: [:create, :edit, :update, :destroy]
  resources :relationships, only: [:create, :destroy]
  get '/my_course' => 'management_date_spots#my_course'
  post '/add_course' => 'management_date_spots#add_course'
  delete '/delete_course' => 'management_date_spots#delete_course'
  resources :courses, only: [:index, :show, :edit, :create, :update, :destroy]
end
