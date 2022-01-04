module ManagementDateSpotsHelper
  def current_management
    # managementのidとそのmanagementのuserのidが同じの場合は前の分を使用する。
    if current_user
      current_management = current_user.management || current_user.create_management!
    else
      current_management = Management.find_by(id: session[:management_id]) || Management.create
      session[:management_id] = current_management.id
    end
    current_management
  end
end
