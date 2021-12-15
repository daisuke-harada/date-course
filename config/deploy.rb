# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "date-course"
set :repo_url, "https://github.com/daisuke-harada/date-course.git"
set :deploy_to, "/home/ec2-user/date-course"
set :rbenv_ruby, '2.7.2'
set :linked_files, %w{config/master.key .env}

task :deployment do
  application = fetch :application
  on roles(:web) do # onブロックの「対象サーバ」の箇所には、前述の「ステージ名.rb」で設定したサーバの条件を指定することができます。例えば、「Webサーバ(:web)のロールが与えられているサーバ」のみを作業対象とする場合は、以下のように書きます。
    # if test "[ -d #{application} ]"
    #   output = capture "cd #{application}; git pull origin master"
    #   info output
    # else
    #   output = capture "git clone #{fetch :repo_url} #{application}"
    #   info output
    # end
    output = capture "sudo docker-compose -f docker-compose.production.yml up build"
    info output    
  end
end