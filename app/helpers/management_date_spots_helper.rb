module ManagementDateSpotsHelper
  def current_management
    if Management.find_by(id: session[:management_id])
      current_management = Management.find_by(id: session[:management_id])
    else
      current_management = Management.new(user_id: current_user.id)
      current_management.save
    end
    session[:management_id] = current_management.id
    current_management
  end
end
