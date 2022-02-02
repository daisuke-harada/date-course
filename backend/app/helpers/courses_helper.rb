module CoursesHelper
  def date_schedule_text(schedule)
    if schedule.nil?
      "デートの日程は現在は未定です"
    else
      "デートの日程は#{schedule.strftime('%Y年%m月%d日')}です。"
    end
  end

  def authority_text(authority)
    if authority
      "このデートコースはユーザーに公開されます"
    else
      "このデートコースはユーザーに対して非公開です。"
    end
  end
end
