# 🌊 Chuyến Du Lịch Quy Nhơn Của Chúng Mình ❤️

Trang web được thiết kế riêng cho chuyến du lịch lãng mạn tại **Quy Nhơn - Bình Định** của bạn và người yêu. Trang web có giao diện biển đảo thơ mộng, đếm ngược ngày đi, gợi ý đặc sản Quy Nhơn, mục tự điền món ăn và địa điểm, cùng hệ thống lịch trình chi tiết rõ ràng **Ngày 1, Ngày 2, Ngày 3** với cơ chế lưu trữ Database để hai bạn cùng sử dụng và chia sẻ công khai.

---

## 🌟 Các Tính Năng Nổi Bật

1. **Giao Diện Lãng Mạn & Biển Đảo Quy Nhơn:**
   - Ảnh nền danh thắng Quy Nhơn (Eo Gió, Kỳ Co, Ghềnh Ráng Tiên Sa, Tháp Đôi, Bãi Xép...).
   - Đồng hồ đếm ngược đến ngày khởi hành (live countdown).
   - Tên cặp đôi và lời nhắn nhủ yêu thương có thể tùy chỉnh.

2. **Gợi Ý Món Ăn & Địa Chỉ Nổi Tiếng (Mục Gợi Ý):**
   - Danh sách món ăn chính gốc Quy Nhơn: Bánh xèo tôm nhảy Gia Vỹ, Bún chả cá Ngọc Liên, Bánh hỏi lòng heo Mẫn, Chả ram tôm đất Dì Anh, Hải sản Eo Gió Leng Keng, Ốc Thúy Kiều, Bún rạm Mỹ Hạnh, Bánh bèo chén Cây Mận, Chè Nhớ...
   - Địa chỉ chuẩn, khoảng giá, lưu ý thưởng thức và link mở trực tiếp trên Google Maps.
   - Nút **"+ Thêm vào Ngày 1, 2, 3"** chuyển nhanh vào lịch trình.

3. **Món Ăn Của Chúng Mình (Tự Điền):**
   - Form trực quan để cả hai tự gõ thêm bất kỳ món ăn hay quán ăn nào muốn thưởng thức.
   - Đánh dấu người đề xuất: **👨 Anh thêm** hay **👩 Em thêm** (hoặc cả hai).
   - Nút chuyển trực tiếp vào Lịch trình Ngày 1-2-3 và link xem trên Google Maps.

4. **Những Nơi Chúng Ta Sẽ Đến (Tự Điền):**
   - Form chuyên biệt để hai bạn tự do thêm các địa điểm check-in, bãi biển, quán cafe chill ngắm sóng, hoặc tọa độ sống ảo.
   - Đánh dấu người đề xuất: **👨 Anh thêm** hay **👩 Em thêm**.
   - Nút chuyển trực tiếp vào Lịch trình Ngày 1-2-3 và link xem trên Google Maps.

5. **Dự Định Lịch Trình Chi Tiết (Rõ Ràng Ngày 1, Ngày 2, Ngày 3):**
   - Phân chia thành từng ngày độc lập: **Ngày 1**, **Ngày 2**, **Ngày 3** (có nút thêm Ngày 4, Ngày 5...).
   - Trong mỗi ngày, phân tách 4 khung giờ: **🌅 Buổi Sáng**, **☀️ Buổi Trưa**, **🌇 Buổi Chiều**, **🌙 Buổi Tối**.
   - Mỗi dự định ghi rõ: **Sẽ làm gì**, **Đi đâu**, **Ăn uống gì**, **Ai lên ý tưởng**, **Chi phí dự kiến**, **Ghi chú**.
   - Checkbox tích chọn **"Đã trải nghiệm"** khi hai bạn đã hoàn thành hoạt động đó!

6. **Cơ Sở Dữ Liệu & Đồng Bộ Tự Động Toàn Hệ Thống:**
   - **Tự động kết nối Firebase Đám Mây:** Trang web đã được cấu hình mặc định sẵn kết nối Firebase Realtime Database (`mytravel-d332a`, phòng `OanhvaVuong`).
   - **Bất kỳ ai mở link web** trên máy tính hay điện thoại đều **tự động kết nối ngay lập tức**, không cần phải nhập hay cấu hình bất kỳ thứ gì.
   - **Đồng bộ thời gian thực 2 chiều:** Khi một người thêm/sửa/xóa món ăn, địa điểm hay tích chọn hoạt động trên lịch trình, máy của người kia sẽ cập nhật ngay tức thì mà không cần tải lại trang.
   - **Lưu trữ đa tầng an toàn:** Kết hợp đồng thời Firebase Realtime Database + LocalStorage trên máy + Fallback REST API, đảm bảo dữ liệu không bao giờ bị mất ngay cả khi mạng 4G chập chờn.
   - **Sao lưu JSON:** Hỗ trợ xuất và nạp file `.json` sao lưu bất cứ lúc nào.

---

## 🚀 Hướng Dẫn Mở & Chạy Trên VS Code

Máy của bạn đã được cài sẵn extension **Live Server** trong VS Code, các bước thực hiện rất nhanh chóng:

1. **Mở thư mục trong VS Code:**
   - Mở VS Code -> Chọn **File** -> **Open Folder...** -> Chọn thư mục `D:\smallproject`.
2. **Chạy trang web:**
   - Trong cây thư mục bên trái, tìm file `index.html`.
   - **Click chuột phải vào file `index.html`** -> Chọn **"Open with Live Server"** (hoặc bấm tổ hợp phím `Alt + L, Alt + O`).
   - Trình duyệt sẽ tự động mở trang web tại địa chỉ `http://127.0.0.1:5500/index.html`.

---

## 🌐 Hướng Dẫn Xuất Ra Công Khai Để 2 Người Dùng Chung

Để người yêu của bạn có thể mở trang web trên điện thoại của cô ấy (hoặc anh ấy), bạn có thể xuất bản miễn phí 100% trong 2 phút theo 1 trong các cách sau:

### Cách 1: Đưa lên Vercel hoặc Netlify (Khuyên Dùng - Siêu Dễ)
1. Truy cập [vercel.com](https://vercel.com) hoặc [netlify.com](https://netlify.com) và đăng ký tài khoản miễn phí.
2. Kéo thả (drag & drop) toàn bộ thư mục `smallproject` vào ô Upload.
3. Bạn sẽ nhận được ngay 1 đường link công khai (ví dụ: `https://chuyen-di-quy-nhon.vercel.app`).
4. Gửi link này cho người yêu là cả hai cùng mở xem được trên điện thoại!

### Cách: Đưa lên mạng để cả 2 người cùng dùng (Tự động đồng bộ thời gian thực)
1. Toàn bộ thông tin Firebase của chuyến đi (`travel-quy-nhon-city`, phòng `quy-nhon-thang-12`) **đã được tích hợp sẵn 100% vào mã nguồn**.
2. Khi bạn đưa web lên [vercel.com](https://vercel.com) hoặc [netlify.com](https://netlify.com) hoặc GitHub Pages:
   - Bạn chỉ cần gửi đường link web cho bạn gái (hoặc mở trên điện thoại của mình).
   - **Không cần phải điền lại Firebase trên máy khác nữa!** Bất kỳ máy nào mở web lên cũng tự động kết nối và đồng bộ ngay lập tức.
   - Khi một người thêm món ăn, thêm điểm đến, sửa lịch trình Ngày 1-2-3 hoặc đánh dấu hoàn thành, máy người kia sẽ tự động cập nhật ngay tức thì!

---

## 📁 Cấu Trúc Thư Mục

```
d:\smallproject\
├── index.html          # Trang web chính (HTML5 + Tailwind CSS + Responsive)
├── css\
│   └── style.css       # Hiệu ứng kính (Glassmorphism), màu sắc lãng mạn, font chữ
├── js\
│   ├── data.js         # Dữ liệu đặc sản & danh thắng Quy Nhơn tuyển chọn
│   ├── db.js           # Database engine (LocalStorage & Firebase Sync)
│   └── app.js          # Logic điều hướng, countdown, tabs Ngày 1-2-3, form tự điền
└── README.md           # Hướng dẫn chi tiết
```

Chúc hai bạn có một chuyến du lịch Quy Nhơn thật nhiều niềm vui, ăn thật nhiều món ngon và có những bức ảnh kỷ niệm tuyệt đẹp bên nhau! 💑✨
