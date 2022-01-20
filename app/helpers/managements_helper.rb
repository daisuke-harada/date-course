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

  def management_traffic_mode_text(text)
    if text == "DRIVING"
      return "車での移動"
    elsif text == "WALKING"
      return "徒歩による移動"
    elsif text == "BICYCLING"
      return "自転車による移動"
    end
  end
end
