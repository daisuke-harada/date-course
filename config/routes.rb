Rails.application.routes.draw do
  get 'date_spots/new'
  get 'date_spots/show'
  get 'date_spots/edit'
  get 'date_spots/index'
  root 'homes#top'
  get 'homes/top'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
  resources :date_spots
end
