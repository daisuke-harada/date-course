# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "date-course"
set :repo_url, "https://github.com/daisuke-harada/date-course.git"
set :deploy_to, "/home/ec2-user/date-course"
set :rbenv_ruby, '2.7.2'
set :linked_files, %w{config/master.key .env}
set :docker_compose_path, "docker-compose -f docker-compose.production.yml"
set :RAILS_ENV, "RAILS_ENV=production"

namespace :deploy do
  application = fetch :application
  docker_compose_path = fetch :docker_compose_path
  rails_env = fetch :RAILS_ENV
  rails_compile = "#{docker_compose_path} run web rails assets:precompile #{rails_env}"
  db_drop = "#{docker_compose_path} exec -T web rails db:drop #{rails_env} DISABLE_DATABASE_ENVIRONMENT_CHECK=1"
  db_migrate = "#{docker_compose_path} exec -T web rails db:migrate #{rails_env}"
  db_create = "#{docker_compose_path} exec -T web rails db:create #{rails_env}"
  db_seed = "#{docker_compose_path} exec -T web rails db:seed #{rails_env}"

  task :application_update do
    on roles(:web) do # onブロックの「対象サーバ」の箇所には、前述の「ステージ名.rb」で設定したサーバの条件を指定することができます。例えば、「Webサーバ(:web)のロールが与えられているサーバ」のみを作業対象とする場合は、以下のように書きます。
      execute "cd #{application};" "git pull origin master"
    end
  end

  task :build do
    on roles(:web) do
      execute "cd #{application};" "#{docker_compose_path} build"
    end
  end

  task :application_compile do
    on roles(:web) do
      execute "cd #{application};" "#{rails_compile}"
    end
  end

  task :up_containers do
    on roles(:web) do
      execute "cd #{application};" "#{docker_compose_path} up -d"
    end
  end

  task :database_create do
    on roles(:web) do
      execute "cd #{application};" "#{db_create}"
    end
  end

  task :database_set_up do
    on roles(:web) do
      execute "cd #{application};" "#{db_create};" "#{db_migrate};" "#{db_seed};"
    end
  end

  task :database_reset do
    on roles(:web) do
      execute "cd #{application};" "#{db_drop};" "#{db_create};" "#{db_migrate};" "#{db_seed};"
    end
  end

  task :down_containers do
    on roles(:web) do
      execute "cd #{application};" "#{docker_compose_path} down"
    end
  end

  task :destroy_images do
    on roles(:web) do
      execute "cd #{application};" "docker rmi -f `docker images -q`"
    end
  end

  task :application_set_up do
    execute "cd #{application};" "git pull origin master;" "#{docker_compose_path} down;" "docker rmi -f `docker images -q`"
    execute "cd #{application};" "#{docker_compose_path} build;" "#{rails_compile};" "#{docker_compose_path} up -d"
  end
end