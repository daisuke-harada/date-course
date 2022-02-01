module ManagementSupport
  def traffic_mode_text(text)
    if text == "DRIVING"
      return "車での移動"
    elsif text == "WALKING"
      return "徒歩による移動"
    elsif text == "BICYCLING"
      return "自転車による移動"
    end
  end
end

RSpec.configure do |config|
  config.include ManagementSupport
end