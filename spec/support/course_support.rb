module CourseSupport
  def date_schedule_text(schedule)
    if schedule == nil
      return "デートの日程は現在は未定です"
    else
      return "デートの日程は#{schedule.strftime("%Y年%m月%d日")}です。"
    end
  end

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