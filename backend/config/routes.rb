Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/signup', to: 'registrations#signup'
      post '/login', to: 'sessions#login'
      resources :date_spots
      resources :date_spot_reviews, only:[:create, :destroy, :update]
      delete '/relationships/:current_user_id/:other_user_id', to: 'relationships#destroy'
      resources :relationships, only: [:create]
      resources :users, only:[:index, :show, :update, :destroy] do
        get 'followings' => 'relationships#followings', as: 'followings'
        get 'followers' => 'relationships#followers', as: 'followers'
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
