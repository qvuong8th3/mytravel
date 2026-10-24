/**
 * Main Application Logic
 * Quy Nhơn Couple Travel Web App
 */

let currentTab = "home";
let currentDayId = "day_1";
let foodFilter = "all";
let foodWishlistFilter = "all";
let destinationWishlistFilter = "all";

// Khởi chạy khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  // 1. Đăng ký lắng nghe thay đổi
  db.subscribe((data, status) => {
    renderTripInfo();
    renderWishlist();
    renderDestinations();
    renderItineraryTabs();
    renderItineraryDay(currentDayId);
    updateSyncStatusIndicator();
  });

  // 2. Khởi tạo Database cục bộ tức thì
  db.init();

  // 3. Khởi tạo giao diện NGAY LẬP TỨC
  initNavigation();
  initCountdown();
  renderTripInfo();
  renderHomeFoods();
  renderHomePlaces();
  renderWishlist();
  renderDestinations();
  renderItineraryTabs();
  renderItineraryDay(currentDayId);
  initForms();
  initSettingsModal();
  updateSyncStatusIndicator();
});

// ================= NAVIGATION & TAB MANAGEMENT =================
function initNavigation() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute("data-tab-target");
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  currentTab = tabId;

  // Cập nhật trạng thái các nút tab desktop & mobile
  document.querySelectorAll("[data-tab-target]").forEach(btn => {
    if (btn.getAttribute("data-tab-target") === tabId) {
      btn.classList.add("text-rose-600", "font-bold", "border-b-2", "border-rose-400");
      btn.classList.remove("text-slate-600");
    } else {
      btn.classList.remove("text-rose-600", "font-bold", "border-b-2", "border-rose-400");
      btn.classList.add("text-slate-600");
    }
  });

  // Ẩn tất cả các tab contents và hiển thị tab được chọn
  document.querySelectorAll(".tab-content-pane").forEach(pane => {
    pane.classList.add("hidden");
  });

  const activePane = document.getElementById(`tab-pane-${tabId}`);
  if (activePane) {
    activePane.classList.remove("hidden");
    activePane.classList.add("animate-fadeIn");
  }

  // Cuộn nhẹ lên đầu nếu cần
  window.scrollTo({ top: 380, behavior: "smooth" });
}

// ================= TRIP INFO & COUNTDOWN =================
function renderTripInfo() {
  const info = db.getTripInfo();
  
  // Tên cặp đôi
  const coupleNamesEl = document.getElementById("hero-couple-names");
  if (coupleNamesEl) {
    coupleNamesEl.textContent = `${info.maleName || "Anh yêu"} ❤️ ${info.femaleName || "Em yêu"}`;
  }

  // Tiêu đề chuyến đi
  const tripTitleEl = document.getElementById("hero-trip-title");
  if (tripTitleEl) {
    tripTitleEl.textContent = info.tripTitle || "Chuyến Du Lịch Quy Nhơn Ngọt Ngào";
  }

  // Lời nhắn nhủ
  const loveNoteEl = document.getElementById("hero-love-note");
  if (loveNoteEl) {
    loveNoteEl.textContent = `"${info.loveNote || "Cùng nhau khám phá trọn vẹn Quy Nhơn nhé!"}"`;
  }

  // Khách sạn
  const hotelInfoEl = document.getElementById("hero-hotel-info");
  if (hotelInfoEl) {
    hotelInfoEl.textContent = `${info.hotelName || "Khách sạn Quy Nhơn"} • ${info.hotelAddress || "Bờ biển Xuân Diệu"}`;
  }

  // Điền sẵn vào Settings Modal
  const maleInput = document.getElementById("cfg-male-name");
  const femaleInput = document.getElementById("cfg-female-name");
  const titleInput = document.getElementById("cfg-trip-title");
  const startInput = document.getElementById("cfg-start-date");
  const endInput = document.getElementById("cfg-end-date");
  const hotelInput = document.getElementById("cfg-hotel-name");
  const addressInput = document.getElementById("cfg-hotel-address");
  const noteInput = document.getElementById("cfg-love-note");

  if (maleInput) maleInput.value = info.maleName || "";
  if (femaleInput) femaleInput.value = info.femaleName || "";
  if (titleInput) titleInput.value = info.tripTitle || "";
  if (startInput) startInput.value = info.startDate || "2026-11-15";
  if (endInput) endInput.value = info.endDate || "2026-11-18";
  if (hotelInput) hotelInput.value = info.hotelName || "";
  if (addressInput) addressInput.value = info.hotelAddress || "";
  if (noteInput) noteInput.value = info.loveNote || "";
}

function initCountdown() {
  function updateTimer() {
    const info = db.getTripInfo();
    const startDate = new Date(info.startDate || "2026-11-15T08:00:00");
    const now = new Date();
    const diff = startDate - now;

    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const labelEl = document.getElementById("countdown-label");

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      if (daysEl) daysEl.textContent = days.toString().padStart(2, "0");
      if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, "0");
      if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, "0");
      if (labelEl) labelEl.textContent = `Đếm ngược ngày đi (${formatDateVN(info.startDate)})`;
    } else {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (labelEl) labelEl.textContent = "🎉 Chúng mình đang ở Quy Nhơn rồi!";
    }
  }

  updateTimer();
  setInterval(updateTimer, 60000);
}

// ================= GỢI Ý MÓN ĂN & ĐỊA ĐIỂM (HOME) =================
function renderHomeFoods() {
  const container = document.getElementById("home-foods-grid");
  if (!container) return;

  const searchQuery = (document.getElementById("search-foods")?.value || "").toLowerCase().trim();
  const filterCat = foodFilter;

  const filtered = QUY_NHON_DATA.foods.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery) ||
                        item.address.toLowerCase().includes(searchQuery) ||
                        item.description.toLowerCase().includes(searchQuery);
    const matchCat = filterCat === "all" || item.category.toLowerCase().includes(filterCat.toLowerCase());
    return matchSearch && matchCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i class="fas fa-utensils text-4xl mb-3"></i>
        <p>Không tìm thấy món ăn phù hợp với từ khóa.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group card-hover">
      <div class="relative h-48 overflow-hidden bg-slate-100">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute top-3 left-3">
          <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-600/90 text-white backdrop-blur-sm">
            ${item.category}
          </span>
        </div>
        <div class="absolute top-3 right-3">
          <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-400 text-amber-950 flex items-center gap-1 shadow-sm">
            <i class="fas fa-star text-xs"></i> ${item.rating}
          </span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-lg text-slate-800 group-hover:text-cyan-700 transition-colors mb-1">
            ${item.name}
          </h3>
          <p class="text-xs text-rose-600 font-semibold mb-2 flex items-center gap-1.5">
            <i class="fas fa-clock"></i> Nên đi: ${item.timeSlot}
          </p>
          <p class="text-sm text-slate-600 line-clamp-2 mb-3">
            ${item.description}
          </p>

          <div class="space-y-1.5 text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div class="flex items-start gap-2">
              <i class="fas fa-map-marker-alt text-cyan-600 mt-0.5"></i>
              <span class="flex-1 font-medium text-slate-700">${item.address}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-tag text-emerald-600"></i>
              <span>Giá khoảng: <strong class="text-emerald-700">${item.priceRange}</strong></span>
            </div>
            ${item.tip ? `
            <div class="flex items-start gap-2 pt-1 border-t border-slate-200/60 text-slate-600 italic">
              <i class="fas fa-lightbulb text-amber-500 mt-0.5"></i>
              <span>${item.tip}</span>
            </div>` : ""}
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button onclick="openAddToItineraryModal('${item.name.replace(/'/g, "\\'")}', '${item.address.replace(/'/g, "\\'")}', '${item.name.replace(/'/g, "\\'")}', '${item.tip ? item.tip.replace(/'/g, "\\'") : ""}')" 
                  class="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-xs font-semibold hover:from-cyan-700 hover:to-teal-700 transition shadow-sm flex items-center justify-center gap-1.5">
            <i class="fas fa-calendar-plus"></i> Thêm vào Ngày 1, 2, 3
          </button>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.address)}" 
             target="_blank" 
             rel="noopener"
             class="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-cyan-600 hover:border-cyan-400 text-xs transition" 
             title="Xem trên Google Maps">
            <i class="fas fa-directions"></i>
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

function renderHomePlaces() {
  const container = document.getElementById("home-places-grid");
  if (!container) return;

  container.innerHTML = QUY_NHON_DATA.places.map(place => `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group card-hover">
      <div class="relative h-48 overflow-hidden bg-slate-100">
        <img src="${place.image}" alt="${place.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute top-3 left-3">
          <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-900/80 text-white backdrop-blur-sm">
            ${place.category}
          </span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-lg text-slate-800 group-hover:text-cyan-700 transition-colors mb-1">
            ${place.name}
          </h3>
          <p class="text-xs text-amber-600 font-semibold mb-2 flex items-center gap-1.5">
            <i class="fas fa-sun"></i> Thời gian lý tưởng: ${place.bestTime}
          </p>
          <p class="text-sm text-slate-600 line-clamp-2 mb-3">
            ${place.highlight}
          </p>

          <div class="space-y-1.5 text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div class="flex items-start gap-2">
              <i class="fas fa-map-marker-alt text-cyan-600 mt-0.5"></i>
              <span class="flex-1 font-medium text-slate-700">${place.address}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-ticket-alt text-teal-600"></i>
              <span>Vé tham quan: <strong>${place.ticket}</strong></span>
            </div>
            ${place.tip ? `
            <div class="flex items-start gap-2 pt-1 border-t border-slate-200/60 text-slate-600 italic">
              <i class="fas fa-camera-retro text-rose-500 mt-0.5"></i>
              <span>${place.tip}</span>
            </div>` : ""}
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button onclick="openAddToItineraryModal('${place.name.replace(/'/g, "\\'")}', '${place.address.replace(/'/g, "\\'")}', '', '${place.tip ? place.tip.replace(/'/g, "\\'") : ""}')" 
                  class="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold hover:from-rose-600 hover:to-pink-600 transition shadow-sm flex items-center justify-center gap-1.5">
            <i class="fas fa-heart"></i> Thêm vào Lịch trình
          </button>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' Quy Nhơn')}" 
             target="_blank" 
             rel="noopener"
             class="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-cyan-600 hover:border-cyan-400 text-xs transition" 
             title="Xem trên Google Maps">
            <i class="fas fa-map-marked-alt"></i>
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

// ================= 1. MÓN ĂN CỦA CHÚNG MÌNH =================
function renderWishlist() {
  const container = document.getElementById("custom-foods-container");
  const countBadge = document.getElementById("custom-foods-count");
  if (!container) return;

  const items = db.getCustomFoods();
  if (countBadge) countBadge.textContent = items.length;

  const filtered = items.filter(item => {
    if (foodWishlistFilter === "all") return true;
    if (foodWishlistFilter === "Anh") return item.creator === "Anh";
    if (foodWishlistFilter === "Em") return item.creator === "Em";
    if (foodWishlistFilter === "fav") return item.favorite;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-14 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
        <i class="fas fa-utensils text-4xl mb-3 text-rose-300"></i>
        <h4 class="font-semibold text-slate-600 mb-1">Chưa có món ăn nào trong danh sách</h4>
        <p class="text-xs text-slate-400">Hai bạn hãy dùng form bên trên để tự gõ thêm những món/quán ăn muốn thử nhé!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isAnh = item.creator === "Anh";
    const isEm = item.creator === "Em";
    const badgeClass = isAnh ? "badge-anh" : (isEm ? "badge-em" : "badge-both");
    const badgeIcon = isAnh ? "👨 Anh thêm" : (isEm ? "👩 Em thêm" : "❤️ Cả hai");

    return `
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition card-hover flex flex-col justify-between relative group">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}">
              ${badgeIcon}
            </span>
            <div class="flex items-center gap-1">
              <button onclick="toggleFavFood('${item.id}')" 
                      class="text-xs p-1.5 rounded-lg transition ${item.favorite ? 'text-rose-500' : 'text-slate-300 hover:text-rose-400'}" 
                      title="${item.favorite ? 'Bỏ yêu thích' : 'Yêu thích'}">
                <i class="fas fa-heart"></i>
              </button>
              <button onclick="deleteFoodItem('${item.id}')" 
                      class="text-xs p-1.5 rounded-lg text-slate-300 hover:text-red-500 transition" 
                      title="Xóa món này">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>

          <h3 class="font-bold text-base text-slate-800 mb-1 flex items-center gap-2">
            ${item.name}
          </h3>

          <span class="inline-block px-2 py-0.5 text-xs font-medium rounded-md bg-rose-50 text-rose-700 mb-2">
            ${item.type || 'Món ăn'}
          </span>

          ${item.address ? `
            <p class="text-xs text-slate-500 mb-2 flex items-start gap-1.5">
              <i class="fas fa-map-marker-alt text-rose-500 mt-0.5"></i>
              <span>${item.address}</span>
            </p>
          ` : ''}

          ${item.notes ? `
            <div class="text-xs text-slate-600 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100/60 mb-3 italic">
              "${item.notes}"
            </div>
          ` : ''}
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button onclick="openAddToItineraryModal('${item.name.replace(/'/g, "\\'")}', '${(item.address || '').replace(/'/g, "\\'")}', '${item.name.replace(/'/g, "\\'")}', '${(item.notes || '').replace(/'/g, "\\'")}', '${item.creator}')"
                  class="flex-1 py-1.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition flex items-center justify-center gap-1.5">
            <i class="fas fa-calendar-check"></i> Chuyển vào Lịch trình
          </button>
          ${item.address ? `
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.address)}" 
             target="_blank" 
             rel="noopener"
             class="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 text-xs" 
             title="Mở Google Maps">
            <i class="fas fa-external-link-alt"></i>
          </a>` : ''}
        </div>
      </div>
    `;
  }).join("");
}

async function toggleFavFood(id) {
  await db.toggleCustomFoodFavorite(id);
  renderWishlist();
}

async function deleteFoodItem(id) {
  if (confirm("Hai bạn có chắc muốn xóa món ăn này khỏi danh sách không?")) {
    await db.deleteCustomFood(id);
    renderWishlist();
    showToast("Đã xóa món ăn thành công");
  }
}

// ================= 2. NHỮNG NƠI CHÚNG TA SẼ ĐẾN =================
function renderDestinations() {
  const container = document.getElementById("custom-destinations-container");
  const countBadge = document.getElementById("custom-destinations-count");
  if (!container) return;

  const items = db.getCustomDestinations();
  if (countBadge) countBadge.textContent = items.length;

  const filtered = items.filter(item => {
    if (destinationWishlistFilter === "all") return true;
    if (destinationWishlistFilter === "Anh") return item.creator === "Anh";
    if (destinationWishlistFilter === "Em") return item.creator === "Em";
    if (destinationWishlistFilter === "fav") return item.favorite;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-14 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
        <i class="fas fa-map-marked-alt text-4xl mb-3 text-amber-300"></i>
        <h4 class="font-semibold text-slate-600 mb-1">Chưa có địa điểm nào trong danh sách</h4>
        <p class="text-xs text-slate-400">Hai bạn hãy dùng form bên trên để tự gõ thêm những nơi muốn ghé thăm nhé!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isAnh = item.creator === "Anh";
    const isEm = item.creator === "Em";
    const badgeClass = isAnh ? "badge-anh" : (isEm ? "badge-em" : "badge-both");
    const badgeIcon = isAnh ? "👨 Anh thêm" : (isEm ? "👩 Em thêm" : "❤️ Cả hai");

    return `
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition card-hover flex flex-col justify-between relative group">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}">
              ${badgeIcon}
            </span>
            <div class="flex items-center gap-1">
              <button onclick="toggleFavDestination('${item.id}')" 
                      class="text-xs p-1.5 rounded-lg transition ${item.favorite ? 'text-rose-500' : 'text-slate-300 hover:text-rose-400'}" 
                      title="${item.favorite ? 'Bỏ yêu thích' : 'Yêu thích'}">
                <i class="fas fa-heart"></i>
              </button>
              <button onclick="deleteDestinationItem('${item.id}')" 
                      class="text-xs p-1.5 rounded-lg text-slate-300 hover:text-red-500 transition" 
                      title="Xóa địa điểm này">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>

          <h3 class="font-bold text-base text-slate-800 mb-1 flex items-center gap-2">
            ${item.name}
          </h3>

          <span class="inline-block px-2 py-0.5 text-xs font-medium rounded-md bg-amber-50 text-amber-800 mb-2">
            ${item.type || 'Địa điểm khám phá'}
          </span>

          ${item.address ? `
            <p class="text-xs text-slate-500 mb-2 flex items-start gap-1.5">
              <i class="fas fa-map-marker-alt text-amber-500 mt-0.5"></i>
              <span>${item.address}</span>
            </p>
          ` : ''}

          ${item.notes ? `
            <div class="text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60 mb-3 italic">
              "${item.notes}"
            </div>
          ` : ''}
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button onclick="openAddToItineraryModal('${item.name.replace(/'/g, "\\'")}', '${(item.address || '').replace(/'/g, "\\'")}', '', '${(item.notes || '').replace(/'/g, "\\'")}', '${item.creator}')"
                  class="flex-1 py-1.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold transition flex items-center justify-center gap-1.5">
            <i class="fas fa-calendar-check"></i> Chuyển vào Lịch trình
          </button>
          ${item.address ? `
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.address)}" 
             target="_blank" 
             rel="noopener"
             class="p-1.5 rounded-xl text-slate-400 hover:text-amber-600 text-xs" 
             title="Mở Google Maps">
            <i class="fas fa-external-link-alt"></i>
          </a>` : ''}
        </div>
      </div>
    `;
  }).join("");
}

async function toggleFavDestination(id) {
  await db.toggleCustomDestinationFavorite(id);
  renderDestinations();
}

async function deleteDestinationItem(id) {
  if (confirm("Hai bạn có chắc muốn xóa địa điểm này khỏi danh sách không?")) {
    await db.deleteCustomDestination(id);
    renderDestinations();
    showToast("Đã xóa địa điểm thành công");
  }
}

// ================= DỰ ĐỊNH LỊCH TRÌNH (ITINERARY - NGÀY 1, NGÀY 2, NGÀY 3) =================
function renderItineraryTabs() {
  const container = document.getElementById("itinerary-days-tabs");
  if (!container) return;

  const itinerary = db.getItinerary();

  // Kiểm tra nếu currentDayId không tồn tại thì chọn ngày đầu tiên
  if (!itinerary.some(d => d.id === currentDayId) && itinerary.length > 0) {
    currentDayId = itinerary[0].id;
  }

  container.innerHTML = itinerary.map(day => `
    <button onclick="selectItineraryDay('${day.id}')" 
            class="day-tab-btn px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border flex items-center gap-2 ${day.id === currentDayId ? 'active' : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300'}">
      <i class="fas fa-calendar-day"></i>
      <span>Ngày ${day.dayNumber}</span>
    </button>
  `).join("") + `
    <button onclick="promptAddNewDay()" 
            class="px-4 py-2 rounded-2xl text-xs font-semibold text-rose-800 border border-rose-200 hover:brightness-95 transition flex items-center gap-1.5 shadow-sm"
            style="background-color: #FFD1DC;" 
            title="Thêm Ngày 4, Ngày 5 nếu chuyến đi dài hơn">
      <i class="fas fa-plus"></i> Thêm ngày
    </button>
  `;
}

function selectItineraryDay(dayId) {
  currentDayId = dayId;
  renderItineraryTabs();
  renderItineraryDay(dayId);
}

function renderItineraryDay(dayId) {
  const day = db.getDay(dayId);
  const container = document.getElementById("itinerary-day-content");
  if (!container) return;

  if (!day) {
    container.innerHTML = `<p class="p-8 text-center text-slate-400">Chưa có thông tin ngày này.</p>`;
    return;
  }

  const activities = day.activities || [];
  const completedCount = activities.filter(a => a.completed).length;

  // Nhóm theo buổi (Sáng, Trưa, Chiều, Tối)
  const timeSlots = ["Sáng", "Trưa", "Chiều", "Tối"];
  const slotIcons = {
    "Sáng": "🌅 Buổi Sáng",
    "Trưa": "☀️ Buổi Trưa",
    "Chiều": "🌇 Buổi Chiều",
    "Tối": "🌙 Buổi Tối"
  };

  container.innerHTML = `
    <!-- Tiêu đề ngày & Nút chức năng (Tone màu #FFD1DC ngọt ngào) -->
    <div class="rounded-3xl p-6 sm:p-7 mb-6 shadow-md relative overflow-hidden border border-rose-200/90" style="background-color: #FFD1DC;">
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/75 text-rose-900 border border-rose-200/80 text-xs font-semibold backdrop-blur-sm mb-2.5 shadow-sm">
            <i class="fas fa-map-marked text-rose-500"></i> Lịch Trình Chi Tiết
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-rose-950 tracking-tight">${day.title}</h2>
          <p class="text-rose-800 text-sm mt-1.5 font-medium">${day.theme || "Kế hoạch cho ngày khám phá Quy Nhơn"}</p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <div class="bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl text-center border border-rose-200/80 shadow-sm">
            <span class="text-xs text-rose-700 block font-medium">Đã trải nghiệm</span>
            <span class="text-lg font-black text-rose-950">${completedCount}/${activities.length} việc</span>
          </div>
          <button onclick="openAddActivityModal('${day.id}')" 
                  class="px-5 py-2.5 rounded-2xl bg-white text-rose-900 text-xs sm:text-sm font-bold hover:bg-rose-50 transition shadow-md border border-rose-200/70 flex items-center gap-2">
            <i class="fas fa-plus-circle text-rose-500 text-base"></i> + Điền Dự Định
          </button>
        </div>
      </div>
      
      <!-- Họa tiết sóng biển nền mờ lãng mạn -->
      <div class="absolute -bottom-6 -right-6 text-rose-300/30 text-9xl pointer-events-none">
        <i class="fas fa-water"></i>
      </div>
    </div>

    <!-- Danh sách 4 Khung Giờ (Sáng, Trưa, Chiều, Tối) -->
    <div class="space-y-6">
      ${timeSlots.map(slot => {
        const slotActs = activities.filter(a => (a.timeSlot || "Sáng") === slot);
        return `
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 class="font-bold text-base text-slate-800 flex items-center gap-2">
                <span>${slotIcons[slot]}</span>
                <span class="text-xs font-normal text-slate-400">(${slotActs.length} hoạt động)</span>
              </h3>
              <button onclick="openAddActivityModal('${day.id}', '${slot}')" 
                      class="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 hover:underline">
                <i class="fas fa-plus"></i> Thêm việc buổi ${slot.toLowerCase()}
              </button>
            </div>

            ${slotActs.length === 0 ? `
              <div class="py-6 text-center text-slate-300 border border-dashed border-slate-100 rounded-2xl">
                <p class="text-xs">Chưa có dự định cho buổi ${slot.toLowerCase()}. Bấm nút "+ Thêm việc" để tự điền nhé!</p>
              </div>
            ` : `
              <div class="space-y-3">
                ${slotActs.map(act => renderActivityCard(day.id, act)).join("")}
              </div>
            `}
          </div>
        `;
      }).join("")}
    </div>

    <!-- Nút xóa ngày nếu nhiều hơn 3 ngày -->
    ${db.getItinerary().length > 3 ? `
      <div class="mt-8 text-center">
        <button onclick="confirmDeleteDay('${day.id}', ${day.dayNumber})" class="text-xs text-red-500 hover:underline">
          <i class="fas fa-trash-alt"></i> Xóa Ngày ${day.dayNumber} này
        </button>
      </div>
    ` : ''}
  `;
}

function renderActivityCard(dayId, act) {
  const isAnh = act.creator === "Anh";
  const isEm = act.creator === "Em";
  const badgeClass = isAnh ? "badge-anh" : (isEm ? "badge-em" : "badge-both");
  const creatorLabel = isAnh ? "Anh" : (isEm ? "Em" : "Cả hai");

  return `
    <div class="activity-item ${act.completed ? 'is-completed' : ''} p-4 rounded-2xl border-l-4 ${act.completed ? 'border-emerald-500 bg-slate-50' : 'bg-white'} shadow-sm hover:shadow transition border-t border-r border-b border-slate-100" style="${act.completed ? '' : 'border-left-color: #FFD1DC;'}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3 flex-1">
          <input type="checkbox" 
                 ${act.completed ? 'checked' : ''} 
                 onchange="toggleComplete('${dayId}', '${act.id}')"
                 class="custom-checkbox mt-1 shrink-0" 
                 title="Đánh dấu đã hoàn thành">
          
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              ${act.timeText ? `
                <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  <i class="far fa-clock text-rose-500"></i> ${act.timeText}
                </span>` : ''}
              <span class="px-2 py-0.5 text-xs font-semibold rounded-full ${badgeClass}">
                Ý tưởng: ${creatorLabel}
              </span>
              ${act.cost ? `
                <span class="text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                  <i class="fas fa-coins text-emerald-600"></i> ${act.cost}
                </span>` : ''}
            </div>

            <h4 class="activity-title font-bold text-slate-800 text-base mb-1.5">
              ${act.title}
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
              ${act.location ? `
                <div class="flex items-start gap-1.5">
                  <i class="fas fa-map-marker-alt text-rose-500 mt-0.5"></i>
                  <span><strong>Đi đâu:</strong> ${act.location}</span>
                </div>` : ''}
              ${act.food ? `
                <div class="flex items-start gap-1.5">
                  <i class="fas fa-utensils text-rose-500 mt-0.5"></i>
                  <span><strong>Ăn gì:</strong> ${act.food}</span>
                </div>` : ''}
            </div>

            ${act.notes ? `
              <p class="text-xs text-slate-500 bg-slate-50 p-2 rounded-xl italic">
                <i class="fas fa-sticky-note text-amber-500 mr-1"></i> ${act.notes}
              </p>` : ''}
          </div>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <button onclick="deleteActivityItem('${dayId}', '${act.id}')" 
                  class="p-2 text-slate-300 hover:text-red-500 rounded-lg transition text-xs" 
                  title="Xóa dự định này">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

async function toggleComplete(dayId, actId) {
  const newState = await db.toggleActivityCompleted(dayId, actId);
  renderItineraryDay(dayId);
  if (newState) {
    showToast("Tuyệt vời! Hai bạn đã hoàn thành dự định này 🎉");
  }
}

async function deleteActivityItem(dayId, actId) {
  if (confirm("Hai bạn có chắc muốn xóa dự định này khỏi lịch trình không?")) {
    await db.deleteActivity(dayId, actId);
    renderItineraryDay(dayId);
    showToast("Đã xóa dự định");
  }
}

async function promptAddNewDay() {
  const currentCount = db.getItinerary().length;
  const newNum = currentCount + 1;
  const title = prompt(`Nhập tiêu đề cho Ngày ${newNum}:`, `Ngày ${newNum}: Khám Phá Quy Nhơn`);
  if (title) {
    const theme = prompt("Chủ đề hoặc điểm nhấn của ngày này (không bắt buộc):", "Tự do khám phá và vui chơi");
    const newDay = await db.addDay(title, theme);
    currentDayId = newDay.id;
    renderItineraryTabs();
    renderItineraryDay(newDay.id);
    showToast(`Đã thêm Ngày ${newNum} vào lịch trình!`);
  }
}

async function confirmDeleteDay(dayId, num) {
  if (confirm(`Bạn có chắc muốn xóa Ngày ${num} không?`)) {
    await db.deleteDay(dayId);
    renderItineraryTabs();
    const it = db.getItinerary();
    currentDayId = it.length > 0 ? it[0].id : "";
    renderItineraryDay(currentDayId);
    showToast(`Đã xóa Ngày ${num}`);
  }
}

// ================= MODAL & FORMS =================
function initForms() {
  // 1. Form tự điền Món ăn
  const addFoodForm = document.getElementById("form-add-custom-food");
  if (addFoodForm) {
    addFoodForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("cf-name").value.trim();
      const type = document.getElementById("cf-type").value;
      const address = document.getElementById("cf-address").value.trim();
      const creator = document.getElementById("cf-creator").value;
      const notes = document.getElementById("cf-notes").value.trim();

      if (!name) {
        alert("Vui lòng nhập tên món ăn hoặc quán ăn!");
        return;
      }

      await db.addCustomFood({ name, type, address, creator, notes });
      addFoodForm.reset();
      renderWishlist();
      showToast("Đã lưu món ăn vào danh sách!");
    });
  }

  // Lọc Món ăn theo người thêm
  document.querySelectorAll("[data-food-filter-creator]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-food-filter-creator]").forEach(b => b.classList.remove("bg-rose-500", "text-white"));
      btn.classList.add("bg-rose-500", "text-white");
      foodWishlistFilter = btn.getAttribute("data-food-filter-creator");
      renderWishlist();
    });
  });

  // 2. Form tự điền Những Nơi Sẽ Đến
  const addDestForm = document.getElementById("form-add-custom-destination");
  if (addDestForm) {
    addDestForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("cd-name").value.trim();
      const type = document.getElementById("cd-type").value;
      const address = document.getElementById("cd-address").value.trim();
      const creator = document.getElementById("cd-creator").value;
      const notes = document.getElementById("cd-notes").value.trim();

      if (!name) {
        alert("Vui lòng nhập tên địa điểm hoặc tọa độ muốn đến!");
        return;
      }

      await db.addCustomDestination({ name, type, address, creator, notes });
      addDestForm.reset();
      renderDestinations();
      showToast("Đã lưu địa điểm vào danh sách!");
    });
  }

  // Lọc Điểm đến theo người thêm
  document.querySelectorAll("[data-destination-filter-creator]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-destination-filter-creator]").forEach(b => b.classList.remove("bg-amber-500", "text-white"));
      btn.classList.add("bg-amber-500", "text-white");
      destinationWishlistFilter = btn.getAttribute("data-destination-filter-creator");
      renderDestinations();
    });
  });

  // 3. Tìm kiếm món ăn gợi ý ở mục Home
  const searchInput = document.getElementById("search-foods");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderHomeFoods();
    });
  }

  // Lọc category món ăn ở mục Home
  document.querySelectorAll("[data-food-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-food-filter]").forEach(b => b.classList.remove("bg-cyan-600", "text-white"));
      btn.classList.add("bg-cyan-600", "text-white");
      foodFilter = btn.getAttribute("data-food-filter");
      renderHomeFoods();
    });
  });
}

// Mở modal thêm hoạt động vào ngày
function openAddActivityModal(dayId, defaultSlot = "Sáng") {
  const modal = document.getElementById("modal-add-activity");
  const form = document.getElementById("form-add-activity");
  const daySelect = document.getElementById("modal-act-day");
  const slotSelect = document.getElementById("modal-act-slot");

  if (!modal || !form || !daySelect) return;

  // Đổ danh sách ngày vào select
  const itinerary = db.getItinerary();
  daySelect.innerHTML = itinerary.map(d => `
    <option value="${d.id}" ${d.id === dayId ? 'selected' : ''}>Ngày ${d.dayNumber}: ${d.title}</option>
  `).join("");

  if (slotSelect) slotSelect.value = defaultSlot;

  form.reset();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeAddActivityModal() {
  const modal = document.getElementById("modal-add-activity");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Xử lý Submit Form Hoạt Động
async function handleAddActivitySubmit(e) {
  e.preventDefault();
  const dayId = document.getElementById("modal-act-day").value;
  const timeSlot = document.getElementById("modal-act-slot").value;
  const timeText = document.getElementById("modal-act-time").value.trim();
  const title = document.getElementById("modal-act-title").value.trim();
  const location = document.getElementById("modal-act-location").value.trim();
  const food = document.getElementById("modal-act-food").value.trim();
  const creator = document.getElementById("modal-act-creator").value;
  const cost = document.getElementById("modal-act-cost").value.trim();
  const notes = document.getElementById("modal-act-notes").value.trim();

  if (!title) {
    alert("Vui lòng nhập tên dự định (Ví dụ: Đón bình minh, Tắm biển Kỳ Co...)");
    return;
  }

  await db.addActivity(dayId, {
    timeSlot,
    timeText,
    title,
    location,
    food,
    creator,
    cost,
    notes
  });

  closeAddActivityModal();
  selectItineraryDay(dayId);
  switchTab("itinerary");
  showToast("Đã thêm dự định vào lịch trình!");
}

// Modal thêm nhanh từ Gợi ý / Wishlist vào Lịch trình
function openAddToItineraryModal(title, location, food, notes = "", creator = "Cả hai") {
  const modal = document.getElementById("modal-quick-add");
  const daySelect = document.getElementById("quick-add-day");

  if (!modal || !daySelect) return;

  const itinerary = db.getItinerary();
  daySelect.innerHTML = itinerary.map(d => `
    <option value="${d.id}" ${d.id === currentDayId ? 'selected' : ''}>Ngày ${d.dayNumber}: ${d.title}</option>
  `).join("");

  document.getElementById("quick-add-title").value = title || "";
  document.getElementById("quick-add-location").value = location || "";
  document.getElementById("quick-add-food").value = food || "";
  document.getElementById("quick-add-notes").value = notes || "";
  document.getElementById("quick-add-creator").value = creator || "Cả hai";

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeQuickAddModal() {
  const modal = document.getElementById("modal-quick-add");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

async function handleQuickAddSubmit(e) {
  e.preventDefault();
  const dayId = document.getElementById("quick-add-day").value;
  const timeSlot = document.getElementById("quick-add-slot").value;
  const title = document.getElementById("quick-add-title").value;
  const location = document.getElementById("quick-add-location").value;
  const food = document.getElementById("quick-add-food").value;
  const notes = document.getElementById("quick-add-notes").value;
  const creator = document.getElementById("quick-add-creator").value;

  await db.addToItinerary(dayId, {
    title,
    location,
    food,
    notes,
    timeSlot,
    creator
  });

  closeQuickAddModal();
  selectItineraryDay(dayId);
  switchTab("itinerary");
  showToast(`Đã thêm vào lịch trình thành công!`);
}

// ================= SETTINGS & FIREBASE SYNC =================
function initSettingsModal() {
  const cfg = db.getFirebaseConfig();
  const urlInput = document.getElementById("cfg-fb-url");
  const keyInput = document.getElementById("cfg-fb-key");
  const projInput = document.getElementById("cfg-fb-project");
  const roomInput = document.getElementById("cfg-fb-room");

  if (cfg) {
    if (urlInput) urlInput.value = cfg.databaseURL || "";
    if (keyInput) keyInput.value = cfg.apiKey || "";
    if (projInput) projInput.value = cfg.projectId || "";
    if (roomInput) roomInput.value = cfg.roomKey || "";
  } else {
    if (urlInput) urlInput.value = "";
    if (keyInput) keyInput.value = "";
    if (projInput) projInput.value = "";
    if (roomInput) roomInput.value = "";
  }
}

function openSettingsModal() {
  renderTripInfo();
  initSettingsModal();
  const modal = document.getElementById("modal-settings");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeSettingsModal() {
  const modal = document.getElementById("modal-settings");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

async function handleSaveSettings(e) {
  e.preventDefault();

  // 1. Cập nhật thông tin cặp đôi
  const tripInfo = {
    maleName: document.getElementById("cfg-male-name").value.trim() || "Vương",
    femaleName: document.getElementById("cfg-female-name").value.trim() || "Oanh",
    tripTitle: document.getElementById("cfg-trip-title").value.trim() || "Chuyến Du Lịch Quy Nhơn Ngọt Ngào",
    startDate: document.getElementById("cfg-start-date").value || "2026-11-15",
    endDate: document.getElementById("cfg-end-date").value || "2026-11-18",
    hotelName: document.getElementById("cfg-hotel-name").value.trim() || "Khách sạn hướng biển Quy Nhơn",
    hotelAddress: document.getElementById("cfg-hotel-address").value.trim() || "Đường Xuân Diệu, TP. Quy Nhơn",
    loveNote: document.getElementById("cfg-love-note").value.trim() || "Cùng nhau khám phá trọn vẹn Quy Nhơn nhé công chúa!"
  };

  await db.updateTripInfo(tripInfo);

  // 2. Cập nhật cấu hình Firebase mới (nếu bạn điền)
  const fbUrl = document.getElementById("cfg-fb-url").value.trim();
  const fbKey = document.getElementById("cfg-fb-key").value.trim();
  const fbProj = document.getElementById("cfg-fb-project").value.trim();
  const fbRoom = document.getElementById("cfg-fb-room").value.trim();

  if (fbUrl) {
    const fbConfig = {
      apiKey: fbKey,
      databaseURL: fbUrl,
      projectId: fbProj,
      roomKey: fbRoom || "OanhvaVuong"
    };
    const res = await db.saveFirebaseConfig(fbConfig);
    showToast(res.message);
  } else {
    await db.saveFirebaseConfig(null);
  }

  closeSettingsModal();
  renderTripInfo();
  initCountdown();
  updateSyncStatusIndicator();
  showToast("Đã lưu thông tin cài đặt!");
}

function updateSyncStatusIndicator() {
  const badge = document.getElementById("sync-status-badge");
  if (!badge) return;

  if (db.isCloudConnected) {
    badge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 cursor-pointer shadow-sm transition hover:scale-105";
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> <span>Đồng bộ tự động (Oanh ❤️ Vương)</span>`;
  } else {
    badge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-300 flex items-center gap-1.5 cursor-pointer shadow-sm";
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span> <span>Đang kết nối Firebase...</span>`;
  }
}

// Xuất JSON
function exportTripData() {
  db.exportJSON();
}

// Nhập JSON
function importTripData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const content = e.target.result;
    const res = await db.importJSON(content);
    alert(res.message);
    if (res.success) {
      location.reload();
    }
  };
  reader.readAsText(file);
}

// Đặt lại mặc định
async function resetTripData() {
  if (confirm("Hai bạn có chắc muốn đặt lại dữ liệu mẫu ban đầu không? Toàn bộ các món đã tự điền sẽ bị hoàn tác.")) {
    await db.resetToDefault();
    location.reload();
  }
}

// ================= TOAST NOTIFICATION & HELPER =================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-20 sm:bottom-6 right-6 z-50 bg-slate-900/90 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-medium border border-white/20 animate-bounce";
  toast.innerHTML = `<i class="fas fa-check-circle text-emerald-400"></i> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.4s ease";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

function formatDateVN(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}
