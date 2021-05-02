module ValidationHelper
  # 画像の形式のバリデーション
  def image_type
    if !image.blob.content_type.in?(%('image/jpeg image/png'))
      errors.add(:image, 'はjpegまたはpng形式でアップロードしてください')
    end
  end
end