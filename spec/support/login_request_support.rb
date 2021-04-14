module LoginRequestSupport
  def sign_in_request_as(user)
    session_params = { session: { name: user.name, password: user.password } }
    post "/login", params: session_params
  end
end

RSpec.configure do |config|
  config.include LoginRequestSupport
end