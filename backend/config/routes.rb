Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      post '/sign_up', to: 'registrations#sign_up'
      post '/login', to: 'sessions#login'
      delete '/logout', to: 'sessions#logout'
      get '/logged_in', to: 'sessions#logged_in?'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
