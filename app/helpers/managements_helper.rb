module ManagementsHelper
  def current_management
    # managementのidとそのmanagementのuserのidが同じの場合は前の分を使用する。
    if current_user
      current_management = current_user.management || current_user.create_management(traffic_mode: "WALKING")
    else
      current_management = Management.find_by(id: session[:management_id]) || Management.create(traffic_mode: "WALKING")
      session[:management_id] = current_management.id
    end
    current_management
  end
end
