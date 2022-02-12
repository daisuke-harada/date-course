Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'homes/top'
      resources :users
      resources :date_spots
      post   '/login',   to: 'sessions#create'
      delete '/logout',  to: 'sessions#destroy'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
