class DateSpotReviewSerializer < ActiveModel::Serializer
  attributes :id, :rate, :content, :user_id, :date_spot_id

  attribute :user_name, if: :user_info_included?
  attribute :user_gender, if: :user_info_included?
  attribute :user_image, if: :user_info_included?

  def user_info_included?
    instance_options[:include_user_info]
  end
end
