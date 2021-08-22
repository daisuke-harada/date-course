module DateSpotReviewsHelper

  # 何もレビューされておらず、評価がゼロの際にはZeroDivisionError(整数に対して整数の 0 で除算を行ったときに発生します。)が発生するため、条件演算子で回避する。
  def review_average_calculation(average_target)
    rate_total_value = 0

    average_target.date_spot_reviews.each do |date_spot_review|

      if date_spot_review.rate == nil
        date_spot_review.rate = 0
      end

      rate_total_value += date_spot_review.rate
    end

    return average_target.date_spot_reviews.count > 0 ? rate_total_value / average_target.date_spot_reviews.count : 0
  end
end
