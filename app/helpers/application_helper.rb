module ApplicationHelper
  def display_prefecture_name(prefecture_name)
    Prefecture.find_by(name: prefecture_name).name
  end
end
