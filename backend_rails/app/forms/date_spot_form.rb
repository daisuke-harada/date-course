class DateSpotForm
  include ActiveModel::Model

  attr_accessor :id, :name, :genre_id, :opening_time, :closing_time, :image, :prefecture_id, :city_name

  validates :name, :genre_id, :city_name, :prefecture_id, presence: true

  def save
    return false unless valid?
    ActiveRecord::Base.transaction do
      @date_spot = DateSpot.new(date_spot_attributes)
      @date_spot.build_address(address_attributes)
      @date_spot.save!
    end
    @date_spot
  rescue ActiveRecord::RecordInvalid
    false
  end

  def update(date_spot)
    return false unless valid?

    ActiveRecord::Base.transaction do
      date_spot.update!(date_spot_attributes)
      date_spot.address.update!(address_attributes)
    end

    true
  rescue ActiveRecord::RecordInvalid
    false
  end

  private

  def date_spot_attributes
    {
      name: name,
      genre_id: genre_id,
      opening_time: opening_time,
      closing_time: closing_time,
      image: image
    }
  end

  def address_attributes
    {
      prefecture_id: prefecture_id,
      city_name: city_name
    }
  end
end
