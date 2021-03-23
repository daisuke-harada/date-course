module UsersHelper

  def guest_name
    return User.find_by(id:1).name
  end

  def guest_password
    return "foobar"
  end
end
