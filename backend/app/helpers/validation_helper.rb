module ValidationHelper
  # 画像の形式のバリデーション
  # 画像が添付されていて、画像の形式がjpegとpng以外の場合は添付できないようにする。
  def image_type
    errors.add(:image, 'はjpegまたはpng形式でアップロードしてください') if image.attached? && !image.blob.content_type.in?(%('image/jpeg image/png'))
  end
end
