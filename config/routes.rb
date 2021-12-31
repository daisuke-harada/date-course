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
  resources :courses, only: [:create, :destroy, :show, :index, :update]
  resources :create_courses, only: [:index]
  # get '/my_course' => 'courses#my_course'
  # post '/add_course' => 'courses#add_course'
  # post '/update_course' => 'courses#update_course'
  # delete '/delete_course' => 'courses#delete_course'
end
