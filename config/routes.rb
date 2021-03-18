Rails.application.routes.draw do
  get 'users/show'
  get 'users/new'
  get 'users/edit'
  get 'users/index'
  root 'homes#top'
  get 'homes/top'
  resources :users
end
