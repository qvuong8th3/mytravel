/**
 * Quản lý Cơ Sở Dữ Liệu (Database Manager)
 * Lưu trữ cục bộ (LocalStorage) an toàn và tức thì.
 * Kết nối Firebase đám mây linh hoạt theo thông tin người dùng nhập trong Cài Đặt.
 */

const STORAGE_KEY = "quynhon_couple_trip_v1";
const SETTINGS_KEY = "quynhon_firebase_config_v1";

// Cấu hình Firebase mặc định dùng chung cho tất cả mọi người mở link web (Oanh & Vương)
const DEFAULT_FIREBASE_CONFIG = {
  databaseURL: "https://mytravel-d332a-default-rtdb.asia-southeast1.firebasedatabase.app",
  apiKey: "AIzaSyAs2QVsFD2eGxxDuUHPWNwHFiqzcBAIFO0",
  projectId: "mytravel-d332a",
  roomKey: "OanhvaVuong"
};

class TripDatabase {
  constructor() {
    this.firebaseApp = null;
    this.firebaseDb = null;
    this.isCloudConnected = false;
    this.listeners = [];
    this.data = this.getDefaultData();
  }

  // Cấu trúc dữ liệu mặc định của chuyến đi (Vương & Oanh)
  getDefaultData() {
    return {
      tripInfo: {
        maleName: "Vương",
        femaleName: "Oanh",
        tripTitle: "Chuyến Du Lịch Quy Nhơn Ngọt Ngào Của Chúng Mình 🌊❤️",
        startDate: "2026-11-15",
        endDate: "2026-11-18",
        hotelName: "Khách sạn hướng biển Quy Nhơn",
        hotelAddress: "Đường Xuân Diệu, TP. Quy Nhơn",
        loveNote: "Cùng nhau đón bình minh Eo Gió, ăn hết món ngon Quy Nhơn và lưu lại thật nhiều kỷ niệm đẹp nhé công chúa!"
      },
      itinerary: [
        {
          id: "day_1",
          dayNumber: 1,
          title: "Ngày 1: Khi Thế Giới Thu Nhỏ Lại Vừa Vặn Hai Đứa Mình",
          date: "2026-11-15",
          theme: "Check-in khách sạn, ngắm biển trung tâm & ăn vặt phố đêm",
          activities: [
            {
              id: "act_101",
              timeSlot: "Sáng",
              timeText: "08:30 - 10:30",
              title: "Đáp chuyến bay / tàu đến Quy Nhơn & Check-in",
              location: "Khách sạn đường Xuân Diệu",
              food: "Ăn nhẹ bún chả cá Ngọc Liên",
              creator: "Anh",
              notes: "Thuê xe máy sẵn, gửi hành lý rồi chuẩn bị đồ đẹp đi dạo biển.",
              cost: "350.000đ",
              completed: false
            },
            {
              id: "act_102",
              timeSlot: "Trưa",
              timeText: "11:30 - 13:00",
              title: "Thưởng thức bánh xèo tôm nhảy giòn rụm",
              location: "Bánh xèo Gia Vỹ - 14 Diên Hồng",
              food: "Bánh xèo tôm nhảy & bánh xèo mực cuốn rau mầm",
              creator: "Em",
              notes: "Ăn no nê rồi về phòng nghỉ trưa lấy sức chiều đi chơi.",
              cost: "120.000đ",
              completed: false
            },
            {
              id: "act_103",
              timeSlot: "Chiều",
              timeText: "15:30 - 17:30",
              title: "Ghé Tháp Đôi Chăm Pa & Dạo bờ biển Xuân Diệu",
              location: "Tháp Đôi (Trần Hưng Đạo) & Công viên biển",
              food: "Bánh bèo chén Cây Mận",
              creator: "Cả hai",
              notes: "Chụp bộ ảnh đôi phong cách vintage ở Tháp Đôi.",
              cost: "80.000đ",
              completed: false
            },
            {
              id: "act_104",
              timeSlot: "Tối",
              timeText: "19:00 - 22:00",
              title: "Đại tiệc ốc đêm & Ăn chè Nhớ",
              location: "Ốc Thúy Kiều (Tăng Bạt Hổ) & Chè Nhớ (Ngô Mây)",
              food: "Ốc hương xào me, sò nướng, chè thái sầu riêng",
              creator: "Em",
              notes: "Đi bộ dạo chợ đêm Quy Nhơn mua quà lưu niệm nhỏ xinh.",
              cost: "250.000đ",
              completed: false
            }
          ]
        },
        {
          id: "day_2",
          dayNumber: 2,
          title: "Ngày 2: Bản Tình Ca Đẹp Nhất Mang Tên Em Và Anh",
          date: "2026-11-16",
          theme: "Đón bình minh tại Eo Gió, đi cano ra Kỳ Co và đại tiệc hải sản",
          activities: [
            {
              id: "act_201",
              timeSlot: "Sáng",
              timeText: "05:30 - 08:30",
              title: "Đón bình minh đẹp nhất Việt Nam tại Eo Gió",
              location: "Eo Gió - Xã Nhơn Lý",
              food: "Ăn sáng bánh hỏi lòng heo Mẫn",
              creator: "Anh",
              notes: "Dậy sớm ngắm mặt trời mọc rực rỡ, gió biển lồng lộng siêu thích.",
              cost: "100.000đ",
              completed: false
            },
            {
              id: "act_202",
              timeSlot: "Trưa",
              timeText: "09:00 - 13:30",
              title: "Đi cano ra Bãi Kỳ Co tắm biển & Lặn ngắm san hô Bãi Dứa",
              location: "Kỳ Co & Nhà hàng Hải sản Leng Keng Nhơn Lý",
              food: "Cua huỳnh đế, mực nướng, cháo hải sản",
              creator: "Em",
              notes: "Mang kem chống nắng, kính râm, váy maxi màu nổi chụp ảnh.",
              cost: "750.000đ",
              completed: false
            },
            {
              id: "act_203",
              timeSlot: "Chiều",
              timeText: "16:00 - 18:00",
              title: "Trượt cát đồi Phương Mai & Check-in cầu Thị Nại",
              location: "Đồi cát Phương Mai & Cầu vượt biển Thị Nại",
              food: "Nước mía / Dừa xiêm ven đường",
              creator: "Anh",
              notes: "Ngắm hoàng hôn trên cầu Thị Nại cực kỳ lãng mạn.",
              cost: "50.000đ",
              completed: false
            },
            {
              id: "act_204",
              timeSlot: "Tối",
              timeText: "19:30 - 22:30",
              title: "Ăn lẩu hải sản & Cafe acoustic view biển lộng gió",
              location: "Khu ẩm thực Hoa Lư & Surf Bar bờ biển",
              food: "Hải sản nướng & Mocktail Surf Bar",
              creator: "Cả hai",
              notes: "Ngồi ghế lười bãi biển nghe tiếng sóng và nhạc du dương.",
              cost: "300.000đ",
              completed: false
            }
          ]
        },
        {
          id: "day_3",
          dayNumber: 3,
          title: "Ngày 3: Gói Trọn Từng Khoảnh Khắc Ngọt Ngào Ta Có Nhau",
          date: "2026-11-17",
          theme: "Bãi Trứng Hoàng Hậu, cafe ngắm vịnh biển và mua đặc sản Bình Định",
          activities: [
            {
              id: "act_301",
              timeSlot: "Sáng",
              timeText: "07:30 - 10:30",
              title: "Tham quan Ghềnh Ráng Tiên Sa & Bãi Trứng Hoàng Hậu",
              location: "06 Hàn Mặc Tử, P. Ghềnh Ráng",
              food: "Bún rạm & Bún tôm Mỹ Hạnh",
              creator: "Em",
              notes: "Bãi đá trứng tròn nhẵn rất độc đáo, viếng mộ thi sĩ Hàn Mặc Tử.",
              cost: "80.000đ",
              completed: false
            },
            {
              id: "act_302",
              timeSlot: "Trưa",
              timeText: "11:00 - 13:00",
              title: "Ăn gà chỉ nướng cơm lam & Nghỉ chân",
              location: "Gà chỉ Sáu Cao (Đường Quy Nhơn - Sông Cầu)",
              food: "Gà nướng lu than hồng & Xôi lòng gà chiên giòn",
              creator: "Anh",
              notes: "Gà ta thả đồi dai ngọt, không gian vườn võng nằm nghỉ trưa cực mát.",
              cost: "320.000đ",
              completed: false
            },
            {
              id: "act_303",
              timeSlot: "Chiều",
              timeText: "14:30 - 17:00",
              title: "Mua sắm đặc sản làm quà & Cafe tạm biệt Quy Nhơn",
              location: "Đặc sản Dì Anh (Cần Vương) & Cafe Bãi Xép",
              food: "Bánh ít lá gai, nem Chợ Huyện, chả ram tôm đất",
              creator: "Cả hai",
              notes: "Đóng gói cẩn thận thùng xốp đem lên máy bay/xe về nhà.",
              cost: "500.000đ",
              completed: false
            }
          ]
        }
      ],
      customFoods: [
        {
          id: "cf_1",
          name: "Bánh tráng nướng & Trứng cút lộn xào me Phan Bội Châu",
          type: "Ăn vặt / Ăn đêm",
          address: "Đoạn đường Phan Bội Châu giao Trần Bình Trọng",
          creator: "Em",
          notes: "Thấy review trên TikTok bảo nước sốt me ở đây đỉnh chóp, nhất định phải thử!",
          addedAt: new Date().toISOString(),
          favorite: true
        },
        {
          id: "cf_2",
          name: "Hải sản tươi sống đêm khu phố Hoa Lư",
          type: "Hải sản tươi sống",
          address: "Đường Hoa Lư, TP. Quy Nhơn",
          creator: "Anh",
          notes: "Nhiều loại ốc biển lạ tươi rói, gọi thêm đĩa sò điệp nướng mỡ hành cho em yêu.",
          addedAt: new Date().toISOString(),
          favorite: true
        }
      ],
      customDestinations: [
        {
          id: "cd_1",
          name: "Cây cầu gỗ Hòn Khô & Con đường cát xuyên biển",
          type: "Biển đảo / Tắm biển",
          address: "Thôn Hải Đông, Xã Nhơn Hải",
          creator: "Anh",
          notes: "Anh muốn dắt em đi dạo trên cây cầu gỗ ôm vách đá sát mép sóng, chụp ảnh đôi hoàng hôn thật đẹp.",
          addedAt: new Date().toISOString(),
          favorite: true
        },
        {
          id: "cd_2",
          name: "Tiệm Cafe Bãi Xép ngắm sóng vỗ",
          type: "Cafe chill ven biển",
          address: "Khu du lịch Bãi Xép, Ghềnh Ráng",
          creator: "Em",
          notes: "Chỗ này ngồi uống nước dừa nghe tiếng sóng vỗ rì rào cực kỳ lãng mạn, hai đứa mình nhất định phải ghé!",
          addedAt: new Date().toISOString(),
          favorite: true
        }
      ],
      customPlaces: []
    };
  }

  normalizeData(rawData) {
    if (!rawData) return this.getDefaultData();

    let foods = rawData.customFoods;
    if (!foods && rawData.customPlaces) {
      foods = rawData.customPlaces.filter(p => !p.type || (!p.type.includes("Check-in") && !p.type.includes("Cafe") && !p.type.includes("Biển")));
    }

    let destinations = rawData.customDestinations;
    if (!destinations && rawData.customPlaces) {
      destinations = rawData.customPlaces.filter(p => p.type && (p.type.includes("Check-in") || p.type.includes("Cafe") || p.type.includes("Biển")));
    }

    return {
      tripInfo: { ...this.getDefaultData().tripInfo, ...(rawData.tripInfo || {}) },
      itinerary: (rawData.itinerary && rawData.itinerary.length) ? rawData.itinerary : this.getDefaultData().itinerary,
      customFoods: (foods && foods.length) ? foods : this.getDefaultData().customFoods,
      customDestinations: (destinations && destinations.length) ? destinations : this.getDefaultData().customDestinations,
      customPlaces: []
    };
  }

  // Khởi tạo Database an toàn, không bao giờ làm treo trang
  init() {
    this.loadFromLocalStorage();
    // Tự động kết nối Firebase đám mây ở chế độ nền (không block giao diện)
    setTimeout(() => {
      this.initFirebaseInBackground();
    }, 50);

    // Tự động đồng bộ lại khi người dùng quay lại tab web (ví dụ mở lại điện thoại hoặc đổi tab)
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && this.isCloudConnected && this.firebaseDb) {
          const config = this.getFirebaseConfig();
          const roomKey = (config && config.roomKey) || "OanhvaVuong";
          this.firebaseDb.ref(`trips/${roomKey}`).once("value").then(snapshot => {
            const val = snapshot.val();
            if (val && (val.itinerary || val.tripInfo || val.customFoods || val.customDestinations)) {
              this.data = this.normalizeData(val);
              this.saveToLocalStorage();
              this.notifyListeners();
            }
          }).catch(() => {});
        }
      });
    }
  }

  // Tải dữ liệu từ LocalStorage
  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.data = this.normalizeData(JSON.parse(saved));
      } else {
        this.data = this.getDefaultData();
        this.saveToLocalStorage();
      }
    } catch (e) {
      this.data = this.getDefaultData();
    }
  }

  // Lưu vào LocalStorage
  saveToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Lỗi khi ghi LocalStorage:", e);
    }
  }

  // Lấy cấu hình Firebase: Mặc định luôn kết nối tự động tới database của Vương & Oanh
  getFirebaseConfig() {
    try {
      const configStr = localStorage.getItem(SETTINGS_KEY);
      if (configStr) {
        const parsed = JSON.parse(configStr);
        // Nếu đã có cấu hình hợp lệ và đúng project hiện tại
        if (parsed && parsed.databaseURL && parsed.projectId === DEFAULT_FIREBASE_CONFIG.projectId) {
          return {
            databaseURL: parsed.databaseURL,
            apiKey: parsed.apiKey || DEFAULT_FIREBASE_CONFIG.apiKey,
            projectId: parsed.projectId || DEFAULT_FIREBASE_CONFIG.projectId,
            roomKey: parsed.roomKey || DEFAULT_FIREBASE_CONFIG.roomKey
          };
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc cấu hình Firebase:", e);
    }
    // Mặc định luôn dùng cấu hình sẵn cho Oanh & Vương (không cần người dùng tự nhập)
    return DEFAULT_FIREBASE_CONFIG;
  }

  // Lưu cấu hình Firebase và kết nối lại
  async saveFirebaseConfig(config) {
    if (!config || !config.databaseURL) {
      localStorage.removeItem(SETTINGS_KEY);
      // Vẫn dùng default config nếu người dùng xóa
      const ok = await this.initFirebaseInBackground();
      return { success: true, message: "Đã thiết lập lại cấu hình Firebase mặc định." };
    }

    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(config));
      const ok = await this.initFirebaseInBackground();
      if (ok) {
        await this.syncToFirebase();
        return { success: true, message: "Kết nối Firebase thành công! Dữ liệu đã được đồng bộ." };
      } else {
        return { success: false, message: "Không thể kết nối với Firebase. Vui lòng kiểm tra lại cấu hình." };
      }
    } catch (e) {
      return { success: false, message: "Lỗi kết nối: " + e.message };
    }
  }

  // Khởi tạo Firebase an toàn trong background
  async initFirebaseInBackground() {
    const config = this.getFirebaseConfig();
    if (!config || !config.databaseURL) {
      this.isCloudConnected = false;
      this.notifyListeners();
      return false;
    }

    if (typeof firebase === "undefined") {
      console.warn("Firebase SDK chưa được nạp");
      this.isCloudConnected = false;
      this.notifyListeners();
      return false;
    }

    try {
      if (!firebase.apps.length) {
        this.firebaseApp = firebase.initializeApp(config);
      } else {
        this.firebaseApp = firebase.app();
      }

      // Chỉ định rõ databaseURL cho regional database asia-southeast1
      this.firebaseDb = this.firebaseApp.database(config.databaseURL);
      const roomKey = config.roomKey || "OanhvaVuong";
      const tripRef = this.firebaseDb.ref(`trips/${roomKey}`);

      // 1. Kiểm tra dữ liệu trên Cloud ngay khi kết nối
      tripRef.once("value").then((snapshot) => {
        const cloudData = snapshot.val();
        if (cloudData && (cloudData.itinerary || cloudData.tripInfo || cloudData.customFoods || cloudData.customDestinations)) {
          console.log("Đã tải dữ liệu từ Firebase Cloud về máy.");
          this.data = this.normalizeData(cloudData);
          this.saveToLocalStorage();
          this.isCloudConnected = true;
          this.notifyListeners();
        } else {
          // Cloud đang trống, tự động đưa dữ liệu hiện tại lên Cloud
          console.log("Firebase Cloud đang trống, tiến hành đẩy dữ liệu khởi tạo lên...");
          this.isCloudConnected = true;
          this.syncToFirebase();
          this.notifyListeners();
        }
      }).catch(err => {
        console.warn("Lỗi kiểm tra dữ liệu Firebase ban đầu:", err);
      });

      // 2. Lắng nghe thay đổi thời gian thực: Bất kỳ ai sửa thì máy khác nhận ngay lập tức!
      tripRef.on("value", (snapshot) => {
        const val = snapshot.val();
        if (val && (val.itinerary || val.tripInfo || val.customFoods || val.customDestinations)) {
          const currentJson = JSON.stringify(this.data);
          const newJson = JSON.stringify(this.normalizeData(val));
          if (currentJson !== newJson) {
            console.log("Đã nhận dữ liệu mới từ máy khác qua Firebase!");
            this.data = this.normalizeData(val);
            this.saveToLocalStorage();
            this.notifyListeners();
          }
        }
        this.isCloudConnected = true;
      }, (error) => {
        console.warn("Lỗi Firebase realtime:", error);
      });

      this.isCloudConnected = true;
      this.notifyListeners();
      return true;
    } catch (e) {
      console.warn("Lỗi khởi tạo Firebase:", e);
      this.isCloudConnected = false;
      this.notifyListeners();
      return false;
    }
  }

  // Đồng bộ toàn bộ dữ liệu lên Firebase (hỗ trợ cả SDK lẫn REST API fallback)
  async syncToFirebase() {
    const config = this.getFirebaseConfig();
    if (!config || !config.databaseURL) return false;
    const roomKey = config.roomKey || "OanhvaVuong";

    let success = false;

    // 1. Thử qua Firebase Realtime Database SDK
    if (this.firebaseDb) {
      try {
        await this.firebaseDb.ref(`trips/${roomKey}`).set(this.data);
        this.isCloudConnected = true;
        success = true;
      } catch (e) {
        console.warn("Firebase SDK set() gặp sự cố, thử gửi qua REST API...", e);
      }
    }

    // 2. Fallback REST API nếu SDK chưa sẵn sàng hoặc trên mạng di động 4G chập chờn
    if (!success) {
      try {
        const cleanUrl = config.databaseURL.replace(/\/+$/, "");
        const res = await fetch(`${cleanUrl}/trips/${roomKey}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.data)
        });
        if (res.ok) {
          this.isCloudConnected = true;
          success = true;
        }
      } catch (err) {
        console.warn("Lỗi đồng bộ qua REST API:", err);
      }
    }

    return success;
  }

  // Lưu thay đổi: ghi LocalStorage và đẩy ngay lên Firebase
  async commitChanges() {
    this.saveToLocalStorage();
    await this.syncToFirebase();
    this.notifyListeners();
  }

  subscribe(callback) {
    if (typeof callback === "function") {
      this.listeners.push(callback);
    }
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      try {
        listener(this.data, { isCloud: this.isCloudConnected });
      } catch (e) {
        console.error("Lỗi listener callback:", e);
      }
    }
  }

  // ================= TRIP INFO =================
  getTripInfo() {
    return this.data.tripInfo;
  }

  async updateTripInfo(newInfo) {
    this.data.tripInfo = { ...this.data.tripInfo, ...newInfo };
    await this.commitChanges();
    return this.data.tripInfo;
  }

  // ================= LỊCH TRÌNH =================
  getItinerary() {
    return this.data.itinerary || [];
  }

  getDay(dayId) {
    return (this.data.itinerary || []).find(d => d.id === dayId || d.dayNumber === Number(dayId));
  }

  async addDay(title, theme) {
    const nextNumber = (this.data.itinerary.length > 0)
      ? Math.max(...this.data.itinerary.map(d => d.dayNumber || 0)) + 1
      : 1;

    const newDay = {
      id: `day_${nextNumber}`,
      dayNumber: nextNumber,
      title: title || `Ngày ${nextNumber}: Tiếp Tục Khám Phá Quy Nhơn`,
      theme: theme || "Dự định tuyệt vời tiếp theo của 2 bạn",
      activities: []
    };

    this.data.itinerary.push(newDay);
    await this.commitChanges();
    return newDay;
  }

  async deleteDay(dayId) {
    this.data.itinerary = this.data.itinerary.filter(d => d.id !== dayId);
    this.data.itinerary.forEach((d, idx) => {
      d.dayNumber = idx + 1;
    });
    await this.commitChanges();
  }

  async addActivity(dayId, activityData) {
    const day = this.data.itinerary.find(d => d.id === dayId);
    if (!day) return null;

    if (!day.activities) day.activities = [];

    const newActivity = {
      id: "act_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      timeSlot: activityData.timeSlot || "Sáng",
      timeText: activityData.timeText || "",
      title: activityData.title || "Dự định mới",
      location: activityData.location || "",
      food: activityData.food || "",
      creator: activityData.creator || "Cả hai",
      notes: activityData.notes || "",
      cost: activityData.cost || "",
      completed: false,
      createdAt: new Date().toISOString()
    };

    day.activities.push(newActivity);
    await this.commitChanges();
    return newActivity;
  }

  async updateActivity(dayId, actId, updatedData) {
    const day = this.data.itinerary.find(d => d.id === dayId);
    if (!day || !day.activities) return false;

    const idx = day.activities.findIndex(a => a.id === actId);
    if (idx === -1) return false;

    day.activities[idx] = { ...day.activities[idx], ...updatedData };
    await this.commitChanges();
    return true;
  }

  async toggleActivityCompleted(dayId, actId) {
    const day = this.data.itinerary.find(d => d.id === dayId);
    if (!day || !day.activities) return false;

    const act = day.activities.find(a => a.id === actId);
    if (!act) return false;

    act.completed = !act.completed;
    await this.commitChanges();
    return act.completed;
  }

  async deleteActivity(dayId, actId) {
    const day = this.data.itinerary.find(d => d.id === dayId);
    if (!day || !day.activities) return false;

    day.activities = day.activities.filter(a => a.id !== actId);
    await this.commitChanges();
    return true;
  }

  // ================= 1. MÓN ĂN CỦA CHÚNG MÌNH =================
  getCustomFoods() {
    return this.data.customFoods || [];
  }

  async addCustomFood(itemData) {
    if (!this.data.customFoods) this.data.customFoods = [];

    const newItem = {
      id: "cf_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      name: itemData.name || "Món ăn chưa đặt tên",
      type: itemData.type || "Món ăn",
      address: itemData.address || "",
      creator: itemData.creator || "Anh",
      notes: itemData.notes || "",
      favorite: false,
      addedAt: new Date().toISOString()
    };

    this.data.customFoods.unshift(newItem);
    await this.commitChanges();
    return newItem;
  }

  async deleteCustomFood(id) {
    this.data.customFoods = (this.data.customFoods || []).filter(item => item.id !== id);
    await this.commitChanges();
    return true;
  }

  async toggleCustomFoodFavorite(id) {
    const item = (this.data.customFoods || []).find(it => it.id === id);
    if (!item) return false;
    item.favorite = !item.favorite;
    await this.commitChanges();
    return item.favorite;
  }

  // ================= 2. NHỮNG NƠI CHÚNG TA SẼ ĐẾN =================
  getCustomDestinations() {
    return this.data.customDestinations || [];
  }

  async addCustomDestination(itemData) {
    if (!this.data.customDestinations) this.data.customDestinations = [];

    const newItem = {
      id: "cd_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      name: itemData.name || "Địa điểm chưa đặt tên",
      type: itemData.type || "Điểm check-in",
      address: itemData.address || "",
      creator: itemData.creator || "Anh",
      notes: itemData.notes || "",
      favorite: false,
      addedAt: new Date().toISOString()
    };

    this.data.customDestinations.unshift(newItem);
    await this.commitChanges();
    return newItem;
  }

  async deleteCustomDestination(id) {
    this.data.customDestinations = (this.data.customDestinations || []).filter(item => item.id !== id);
    await this.commitChanges();
    return true;
  }

  async toggleCustomDestinationFavorite(id) {
    const item = (this.data.customDestinations || []).find(it => it.id === id);
    if (!item) return false;
    item.favorite = !item.favorite;
    await this.commitChanges();
    return item.favorite;
  }

  getCustomPlaces() {
    return this.getCustomFoods();
  }

  async addCustomPlace(itemData) {
    return await this.addCustomFood(itemData);
  }

  async deleteCustomPlace(id) {
    return await this.deleteCustomFood(id);
  }

  async toggleCustomPlaceFavorite(id) {
    return await this.toggleCustomFoodFavorite(id);
  }

  async addToItinerary(dayId, { title, location, food, notes, timeSlot, creator }) {
    return await this.addActivity(dayId, {
      title: title || "Khám phá địa điểm mới",
      location: location || "",
      food: food || "",
      notes: notes || "",
      timeSlot: timeSlot || "Sáng",
      creator: creator || "Cả hai"
    });
  }

  // ================= XUẤT / NHẬP DỮ LIỆU =================
  exportJSON() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Lich_Trinh_Quy_Nhon_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async importJSON(fileContent) {
    try {
      const parsed = JSON.parse(fileContent);
      if (parsed && (parsed.itinerary || parsed.customFoods || parsed.customDestinations || parsed.customPlaces || parsed.tripInfo)) {
        this.data = this.normalizeData(parsed);
        await this.commitChanges();
        return { success: true, message: "Đã khôi phục dữ liệu chuyến đi thành công!" };
      } else {
        return { success: false, message: "File JSON không đúng cấu trúc lịch trình Quy Nhơn." };
      }
    } catch (e) {
      return { success: false, message: "Lỗi đọc file JSON: " + e.message };
    }
  }

  async resetToDefault() {
    this.data = this.getDefaultData();
    await this.commitChanges();
  }
}

// Khởi tạo instance toàn cục
const db = new TripDatabase();
