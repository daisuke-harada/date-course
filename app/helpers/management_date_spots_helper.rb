module ManagementDateSpotsHelper
  def create_array_address_date_spot(date_spots)
    addresses = []

    date_spots.each do |date_spot|
      addresses.push(date_spot.date_spot.address)
    end

    return addresses
  end
  
  # 追加されたデートスポットモデルが登録されている配列を追加された数だけ作成する。
  def create_array_date_spot_name(date_spots)
    # 追加されたデートスポットモデルが登録されている配列を追加された数だけ作成
    names = Array.new(date_spots.count);
    
    # 追加されたデートスポットの数だけ、名前の配列を用意する。なぜなら、デートスポットによって配列の中身が違うからです。
    for num in 0..(date_spots.count - 1) do
      names[num] = []
      date_spots.each do |date_spot|
        names[num].push(date_spot.date_spot.name)
      end

      # デートスポットによって配列の中身を変える作業を行う。自身の名前がデートスポットの入れ替えの選択肢にあったらおかしいので、自分自身の名前を削除する。
      names[num].delete_at(num)
    end

    return names
  end
end
