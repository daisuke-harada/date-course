Rails.application.routes.draw do
  get '/', to: 'welcome#hello'
  namespace :api do
    namespace :v1 do
      get '/top', to: 'homes#top'
      post '/signup', to: 'registrations#signup'
      post '/login', to: 'sessions#login'
      post '/name_search', to: 'searchs#name_search'
      post '/user_name_search', to: 'searchs#user_name_search'
      post '/date_spot_name_search', to: 'searchs#date_spot_name_search'
      post '/date_spots/sort', to: 'searchs#date_spot_sort_search'
      post '/courses/sort', to: 'searchs#course_sort_search'
      resources :date_spots
      resources :date_spot_reviews, only: [:create, :destroy, :update]
      resources :prefectures, only: [:show]
      resources :genres, only: [:show]
      resources :relationships, only: [:create]
      delete '/relationships/:current_user_id/:other_user_id', to: 'relationships#destroy'
      resources :courses, only: [:create, :destroy, :show, :index]
      resources :users, only: [:index, :show, :update, :destroy] do
        get 'followings' => 'relationships#followings', as: 'followings'
        get 'followers' => 'relationships#followers', as: 'followers'
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
