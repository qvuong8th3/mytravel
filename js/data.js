/**
 * Dữ liệu gợi ý ẩm thực và điểm du lịch đặc sắc tại Quy Nhơn
 * Tuyển chọn các món ngon chính gốc và danh thắng lãng mạn cho cặp đôi
 * Sử dụng hình ảnh cục bộ lưu trong thư mục assets/images/
 */

const QUY_NHON_DATA = {
  // Gợi ý ẩm thực
  foods: [
    {
      id: "food_1",
      name: "Bánh xèo tôm nhảy Gia Vỹ",
      category: "Ăn chính",
      timeSlot: "Sáng / Chiều / Tối",
      image: "assets/images/banhxeo.jpg",
      description: "Bánh xèo vàng giòn rụm, tôm đất tươi sống đỏ au nhảy tanh tách, ăn kèm bánh tráng gạo, xoài chua, dưa leo và rau mầm tươi mát.",
      address: "14 Diên Hồng, TP. Quy Nhơn (hoặc 118 Đống Đa)",
      priceRange: "35.000đ - 55.000đ / cái",
      rating: 4.8,
      recommendedFor: "Bữa trưa / Ăn chiều lót dạ",
      tip: "Nên gọi bánh xèo tôm nhảy kết hợp bánh xèo mực sữa, cuốn rau mầm chấm nước mắm tỏi ớt chua ngọt chuẩn vị!"
    },
    {
      id: "food_2",
      name: "Bún chả cá & Bún sứa Ngọc Liên",
      category: "Ăn sáng",
      timeSlot: "Sáng",
      image: "assets/images/bunchaca.jpg",
      description: "Nước dùng trong vắt ngọt thanh nấu từ xương cá thu, chả cá chiên và hấp dai giòn không pha bột, sứa tươi giòn sần sật.",
      address: "379 Nguyễn Huệ, P. Trần Phú, TP. Quy Nhơn",
      priceRange: "35.000đ - 50.000đ / tô",
      rating: 4.9,
      recommendedFor: "Bữa sáng mở đầu ngày mới",
      tip: "Quán rộng rãi máy lạnh, nhớ ăn kèm tương ớt xào rim Bình Định cực kỳ thơm cay."
    },
    {
      id: "food_3",
      name: "Bánh hỏi lòng heo Mẫn",
      category: "Ăn sáng",
      timeSlot: "Sáng",
      image: "assets/images/banhhoi.jpg",
      description: "Đặc sản truyền thống số 1 Bình Định: Bánh hỏi thoa mỡ hẹ thơm lừng, đĩa lòng luộc nóng hổi giòn ngọt, kèm bát cháo huyết loãng và rau thơm.",
      address: "76 Trần Phú, TP. Quy Nhơn",
      priceRange: "40.000đ - 60.000đ / phần",
      rating: 4.7,
      recommendedFor: "Bữa sáng ấm bụng",
      tip: "Quán mở từ 6h sáng và rất nhanh hết lòng ngon, 2 bạn nên ghé trước 8h sáng nhé!"
    },
    {
      id: "food_4",
      name: "Chả ram tôm đất & Bánh cuốn Tây Sơn Dì Anh",
      category: "Ăn vặt / Ăn chiều",
      timeSlot: "Chiều / Tối",
      image: "assets/images/charamtomdat.jpg",
      description: "Cuốn chả ram giòn tan rôm rốp, nhân tôm đất béo ngọt bọc bánh tráng phơi sương Bình Định, chấm tương đậu phụng bùi béo.",
      address: "22 Cần Vương, P. Nguyễn Văn Cừ, TP. Quy Nhơn",
      priceRange: "30.000đ - 50.000đ / đĩa",
      rating: 4.8,
      recommendedFor: "Ăn vặt chiều hoặc mua làm quà",
      tip: "Món này cuốn cùng bánh tráng mềm và rau thơm ăn hoài không ngấy."
    },
    {
      id: "food_5",
      name: "Hải sản tươi sống Eo Gió - Nhơn Lý (Leng Keng)",
      category: "Hải sản / Ăn tối",
      timeSlot: "Trưa / Tối",
      image: "assets/images/haisan.jpg",
      description: "Vương quốc hải sản đánh bắt trực tiếp: Cua huỳnh đế hấp, bào ngư nướng mỡ hành, tôm hùm, ốc hương sốt trứng muối béo ngậy.",
      address: "Thôn Lý Lương, Xã Nhơn Lý, TP. Quy Nhơn (gần FLC & Eo Gió)",
      priceRange: "150.000đ - 350.000đ / người",
      rating: 4.9,
      recommendedFor: "Bữa trưa sau khi đi Kỳ Co hoặc bữa tối hải sản",
      tip: "Không gian thoáng đãng ngắm làng chài, ốc hương và mực lá nướng muối ớt ở đây tươi rói ngọt thịt."
    },
    {
      id: "food_6",
      name: "Ốc & Hải sản đêm Thúy Kiều",
      category: "Ăn đêm / Ăn vặt",
      timeSlot: "Tối",
      image: "assets/images/ocdem.jpg",
      description: "Quán ốc bình dân nổi tiếng bậc nhất Quy Nhơn với hàng chục loại ốc biển, sò nướng mỡ hành, càng cúm xào me, cháo hàu nóng hổi.",
      address: "5D Tăng Bạt Hổ, TP. Quy Nhơn",
      priceRange: "30.000đ - 70.000đ / đĩa",
      rating: 4.6,
      recommendedFor: "Hẹn hò ăn đêm ấm cúng",
      tip: "Nên thử ốc len xào dừa và sò điệp nướng phô mai béo ngậy!"
    },
    {
      id: "food_7",
      name: "Bún rạm & Bún tôm Mỹ Hạnh",
      category: "Ăn chính",
      timeSlot: "Sáng / Trưa",
      image: "assets/images/bunram.jpg",
      description: "Bún ép tươi tại chỗ, rạm biển giã nhuyễn nấu nước gạch béo đậm đà, ăn kèm bánh tráng nướng giòn rụm và rau sống tươi xanh.",
      address: "32 Ngô Đức Đệ, P. Nguyễn Văn Cừ, TP. Quy Nhơn",
      priceRange: "30.000đ - 45.000đ / tô",
      rating: 4.7,
      recommendedFor: "Bữa sáng hương vị làng chài",
      tip: "Bẻ vụn bánh tráng nướng cho vào tô bún để cảm nhận độ giòn ngập nước rạm ngậy béo."
    },
    {
      id: "food_8",
      name: "Gà chỉ đường đèo Sáu Cao",
      category: "Ăn chính",
      timeSlot: "Trưa / Chiều",
      image: "assets/images/gachi.jpg",
      description: "Khách tự tay 'chỉ' con gà ưng ý trong vườn, quán chế biến thành gà nướng mọi lu than hồng, xôi lòng gà chiên giòn, gà hấp hành.",
      address: "Khu vực cầu Bông, Tuy Phước hoặc đường Quy Nhơn - Sông Cầu",
      priceRange: "280.000đ - 350.000đ / con (đủ 2 người ăn no nê)",
      rating: 4.7,
      recommendedFor: "Bữa trưa dã ngoại trong không gian vườn sinh thái mát rượi",
      tip: "Gà đồi thịt săn chắc, thơm ngọt, ăn cùng xôi cháy chiên vàng ươm chấm muối é trắng độc đáo."
    },
    {
      id: "food_9",
      name: "Bánh bèo chén Cây Mận",
      category: "Ăn vặt",
      timeSlot: "Chiều",
      image: "assets/images/banhbeo.jpg",
      description: "Từng chén bánh bèo nóng hổi vừa hấp xong, rắc tôm chấy đỏ cam, đậu phộng rang giòn, hành lá phi thơm và vụn bánh mì chiên.",
      address: "742 Trần Hưng Đạo, P. Đống Đa, TP. Quy Nhơn",
      priceRange: "2.500đ / chén (khay 10 chén chỉ 25k)",
      rating: 4.8,
      recommendedFor: "Bữa xế chiều nhẹ nhàng cho cặp đôi",
      tip: "Rưới nước mắm tỏi ớt ấm ấm vào chén rồi xúc ăn một hơi, vị dẻo mịn béo bùi tan trong miệng."
    },
    {
      id: "food_10",
      name: "Chè Nhớ & Sinh tố hoa quả phố Ngô Mây",
      category: "Tráng miệng",
      timeSlot: "Tối",
      image: "assets/images/che.jpg",
      description: "Quán chè huyền thoại từ thập niên 90 với chè Thái sầu riêng thơm lừng, chè khúc bạch thanh mát, kem bơ béo ngậy.",
      address: "134 Ngô Mây, TP. Quy Nhơn",
      priceRange: "20.000đ - 35.000đ / ly",
      rating: 4.7,
      recommendedFor: "Dạo phố đêm ăn tráng miệng ngọt ngào",
      tip: "Tên quán 'Chè Nhớ' mang ý nghĩa 'Ăn một lần là nhớ mãi' rất thích hợp cho cặp đôi ghé chụp ảnh kỷ niệm."
    }
  ],

  // Gợi ý địa điểm tham quan & check-in tuyệt đẹp cho cặp đôi
  places: [
    {
      id: "place_1",
      name: "Eo Gió Nhơn Lý",
      category: "Thiên nhiên / Sống ảo",
      image: "assets/images/eogio.jpg",
      address: "Thôn Lý Lương, Xã Nhơn Lý, TP. Quy Nhơn",
      bestTime: "Sáng sớm (5h30 - 7h00 ngắm bình minh) hoặc Chiều (16h00 - 17h30)",
      highlight: "Cung đường đi bộ ven biển đẹp ngoạn mục với hàng rào uốn lượn ôm trọn bờ vịnh đá hùng vĩ và gió biển lồng lộng.",
      ticket: "25.000đ / vé",
      tip: "Gió ở đây khá to, nàng nên mang váy maxi sáng màu và kẹp tóc chắc chắn để có những bức ảnh bay bổng tuyệt mỹ."
    },
    {
      id: "place_2",
      name: "Bãi biển Kỳ Co",
      category: "Biển đảo / Tắm biển",
      image: "assets/images/kyco.jpg",
      address: "Bán đảo Phương Mai, Xã Nhơn Lý, TP. Quy Nhơn",
      bestTime: "8h00 - 14h00",
      highlight: "Được ví như 'Maldives của Việt Nam' với làn nước biển trong vắt nhìn thấy tận đáy, bãi cát trắng mịn và cầu tàu sống ảo.",
      ticket: "Khoảng 100.000đ / vé (hoặc tour cano 350k - 450k gồm cano + ăn hải sản)",
      tip: "Nên đi cano cao tốc ra bãi tắm để kết hợp lặn ngắm san hô tại Bãi Dứa siêu đẹp."
    },
    {
      id: "place_3",
      name: "Ghềnh Ráng Tiên Sa & Bãi Trứng Hoàng Hậu",
      category: "Lịch sử / Phong cảnh",
      image: "assets/images/ghenhrang.jpg",
      address: "06 Hàn Mặc Tử, P. Ghềnh Ráng, TP. Quy Nhơn (ngay trung tâm)",
      bestTime: "Chiều tà (15h30 - 17h30)",
      highlight: "Bãi đá trứng tròn nhẵn như quả trứng khủng long nơi Hoàng hậu Nam Phương từng tắm mát, viếng mộ thi sĩ tài hoa Hàn Mặc Tử.",
      ticket: "Miễn phí vé vào cổng (Gửi xe 5.000đ)",
      tip: "Từ đồi thi nhân nhìn xuống có thể phóng tầm mắt ôm trọn toàn bộ bãi biển cong hình vầng trăng khuyết của TP. Quy Nhơn."
    },
    {
      id: "place_4",
      name: "Hòn Khô (Làng chài Nhơn Hải)",
      category: "Hoang sơ / Lặn san hô",
      image: "assets/images/honkho.jpg",
      address: "Thôn Hải Đông, Xã Nhơn Hải, TP. Quy Nhơn",
      bestTime: "Buổi sáng nắng đẹp (8h00 - 12h00)",
      highlight: "Cây cầu gỗ ôm men vách đá sát mép sóng biển, con đường cát đi bộ xuyên biển hiện ra khi thủy triều rút cực kỳ kỳ thú.",
      ticket: "Thuyền chèo/cano sang đảo: 50.000đ - 100.000đ / người",
      tip: "Làng chài Nhơn Hải rất mộc mạc yên bình, người dân thân thiện, đồ hải sản tươi ngon giá mềm."
    },
    {
      id: "place_5",
      name: "Tháp Đôi Chăm Pa (Tháp Hưng Thạnh)",
      category: "Văn hóa / Check-in",
      image: "assets/images/thapdoi.jpg",
      address: "Đường Trần Hưng Đạo, P. Đống Đa, TP. Quy Nhơn",
      bestTime: "Sáng 8h00 - 10h00 hoặc Chiều 14h00 - 16h00",
      highlight: "Công trình kiến trúc Chăm Pa cổ kính từ thế kỷ XII nằm giữa vườn dừa xanh ngát, những đường nét chạm khắc thần thoại tinh xảo.",
      ticket: "20.000đ / vé",
      tip: "Mang trang phục tone trắng, be, cam đất hoặc bohemian sẽ có những tấm ảnh kỷ niệm vô cùng nghệ thuật."
    },
    {
      id: "place_6",
      name: "Bãi Xép & Các quán cafe ven biển",
      category: "Chill / Lãng mạn",
      image: "assets/images/baixep.jpg",
      address: "Khu vực Bãi Xép, P. Ghềnh Ráng (cách trung tâm 12km về phía Nam)",
      bestTime: "Chiều ngắm hoàng hôn và tối nghe sóng vỗ",
      highlight: "Làng chài nhỏ nép mình bên bãi biển trong vắt với nhiều quán pub, cafe gỗ mộc cực chill hướng thẳng ra đại dương.",
      ticket: "Tùy quán cafe (35.000đ - 65.000đ / món đồ uống)",
      tip: "Cực kỳ thích hợp cho 2 người ngồi tựa vai nhau thưởng thức cocktail, trò chuyện dưới ánh đèn lung linh bên tiếng sóng biển rì rào."
    }
  ],

  // Lịch trình mẫu Ngày 1, 2, 3 thiết kế sẵn khung giờ và gợi ý trống cho 2 bạn điền
  defaultDays: [
    {
      id: "day_1",
      dayNumber: 1,
      title: "Ngày 1: Chào Quy Nhơn - Biển Xanh & Phố Thị",
      theme: "Check-in khách sạn, ngắm biển trung tâm & khám phá ẩm thực đêm",
      notes: "Hai bạn cùng điền các dự định ăn uống và vui chơi cho ngày đầu tiên nhé!",
      activities: []
    },
    {
      id: "day_2",
      dayNumber: 2,
      title: "Ngày 2: Kỳ Co - Eo Gió & Thiên Đường San Hô",
      theme: "Đón bình minh tại Eo Gió, tắm biển Kỳ Co và thưởng thức đại tiệc hải sản",
      notes: "Ngày check-in sống ảo nhiều nhất, nhớ sạc đầy pin điện thoại và chuẩn bị trang phục đẹp!",
      activities: []
    },
    {
      id: "day_3",
      dayNumber: 3,
      title: "Ngày 3: Ghềnh Ráng Tiên Sa - Mua Quà Đặc Sản & Tạm Biệt",
      theme: "Bãi Trứng Hoàng Hậu, cafe ngắm vịnh biển và mua đặc sản Bình Định làm quà",
      notes: "Tận hưởng những khoảnh khắc cuối chuyến đi thật trọn vẹn bên nhau!",
      activities: []
    }
  ]
};
