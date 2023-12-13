class DateSpotReviewSerializer < ActiveModel::Serializer
  attributes :id, :rate, :content, :user_id, :date_spot_id

  # 以下のようにinstanceオプションを設定した場合のみ以下のattributeは指定される
  #  DateSpotReviewSerializer.new(date_spot_review, include_user_info: true)
  attribute :user_name, if: :user_info_included?
  attribute :user_gender, if: :user_info_included?
  attribute :user_image, if: :user_info_included?

  def user_name
    object.user.name
  end

  def user_gender
    object.user.gender
  end

  def user_image
    object.user.image
  end

  def user_info_included?
    instance_options[:include_user_info]
  end
end
