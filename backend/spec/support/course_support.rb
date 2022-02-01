module CourseSupport
  def authority_text(authority)
    if authority
      return "このデートコースはユーザーに公開されます"
    else
      return "このデートコースはユーザーに対して非公開です。"
    end
  end
end

RSpec.configure do |config|
  config.include CourseSupport
end