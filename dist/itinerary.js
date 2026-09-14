const departureInput = document.querySelector("#departure-airport");
const departureList = document.querySelector("#departure-airports");
const arrivalSelect = document.querySelector("#arrival-airport");
const checkinInput = document.querySelector("#checkin-date");
const checkoutInput = document.querySelector("#checkout-date");
const guestList = document.querySelector("#guest-list");
const addGuestButton = document.querySelector("#add-guest");
const form = document.querySelector("#itinerary-form");
const documentsArea = document.querySelector("#documents");
const flightDocument = document.querySelector("#flight-document");
const hotelDocument = document.querySelector("#hotel-document");
const message = document.querySelector("#itinerary-message");

const departureAirports = [
  ["DEL", "Indira Gandhi International Airport", "Delhi", "India"],
  ["BOM", "Chhatrapati Shivaji Maharaj International Airport", "Mumbai", "India"],
  ["BLR", "Kempegowda International Airport", "Bengaluru", "India"],
  ["MAA", "Chennai International Airport", "Chennai", "India"],
  ["HYD", "Rajiv Gandhi International Airport", "Hyderabad", "India"],
  ["CCU", "Netaji Subhas Chandra Bose International Airport", "Kolkata", "India"],
  ["COK", "Cochin International Airport", "Kochi", "India"],
  ["AMD", "Sardar Vallabhbhai Patel International Airport", "Ahmedabad", "India"],
  ["GOX", "Manohar International Airport", "Goa", "India"],
  ["GOI", "Dabolim Airport", "Goa", "India"],
  ["TRV", "Trivandrum International Airport", "Thiruvananthapuram", "India"],
  ["CCJ", "Calicut International Airport", "Kozhikode", "India"],
  ["LKO", "Chaudhary Charan Singh International Airport", "Lucknow", "India"],
  ["ATQ", "Sri Guru Ram Dass Jee International Airport", "Amritsar", "India"],
  ["JAI", "Jaipur International Airport", "Jaipur", "India"],
  ["IXC", "Chandigarh International Airport", "Chandigarh", "India"],
  ["PNQ", "Pune Airport", "Pune", "India"],
  ["IXE", "Mangaluru International Airport", "Mangaluru", "India"],
  ["IXM", "Madurai Airport", "Madurai", "India"],
  ["CJB", "Coimbatore International Airport", "Coimbatore", "India"],
  ["LHR", "Heathrow Airport", "London", "United Kingdom"],
  ["LGW", "Gatwick Airport", "London", "United Kingdom"],
  ["JFK", "John F. Kennedy International Airport", "New York", "United States"],
  ["LAX", "Los Angeles International Airport", "Los Angeles", "United States"],
  ["YYZ", "Toronto Pearson International Airport", "Toronto", "Canada"],
  ["SIN", "Singapore Changi Airport", "Singapore", "Singapore"],
  ["KUL", "Kuala Lumpur International Airport", "Kuala Lumpur", "Malaysia"],
  ["BKK", "Suvarnabhumi Airport", "Bangkok", "Thailand"],
  ["DOH", "Hamad International Airport", "Doha", "Qatar"],
  ["RUH", "King Khalid International Airport", "Riyadh", "Saudi Arabia"],
  ["JED", "King Abdulaziz International Airport", "Jeddah", "Saudi Arabia"],
  ["KWI", "Kuwait International Airport", "Kuwait City", "Kuwait"],
  ["BAH", "Bahrain International Airport", "Manama", "Bahrain"],
  ["MCT", "Muscat International Airport", "Muscat", "Oman"],
  ["IST", "Istanbul Airport", "Istanbul", "Turkey"],
  ["CDG", "Charles de Gaulle Airport", "Paris", "France"],
  ["FRA", "Frankfurt Airport", "Frankfurt", "Germany"],
  ["AMS", "Amsterdam Schiphol Airport", "Amsterdam", "Netherlands"],
  ["SYD", "Sydney Kingsford Smith Airport", "Sydney", "Australia"]
];

const uaeAirports = [
  ["DXB", "Dubai International Airport", "Dubai"],
  ["DWC", "Al Maktoum International Airport", "Dubai"],
  ["AUH", "Zayed International Airport", "Abu Dhabi"],
  ["SHJ", "Sharjah International Airport", "Sharjah"],
  ["RKT", "Ras Al Khaimah International Airport", "Ras Al Khaimah"],
  ["AAN", "Al Ain International Airport", "Al Ain"],
  ["FJR", "Fujairah International Airport", "Fujairah"]
];

const hotelOptions = {
  Dubai: [
    ["Deira City Stay Hotel", "3-star sample option", "Deira, Dubai"],
    ["Al Barsha Comfort Inn", "3-star sample option", "Al Barsha, Dubai"],
    ["Bur Dubai Plaza Hotel", "2-star sample option", "Bur Dubai, Dubai"],
    ["Dubai Creek View Hotel", "3-star sample option", "Creek area, Dubai"],
    ["Jumeirah Budget Suites", "3-star sample option", "Jumeirah, Dubai"],
    ["Airport Transit Stay Dubai", "2-star sample option", "Airport area, Dubai"]
  ],
  "Abu Dhabi": [
    ["Capital City Guest Hotel", "3-star sample option", "Downtown Abu Dhabi"],
    ["Corniche Standard Hotel", "3-star sample option", "Corniche area, Abu Dhabi"],
    ["Airport Road Stay Inn", "2-star sample option", "Airport Road, Abu Dhabi"],
    ["Madinat Zayed Comfort Hotel", "3-star sample option", "Madinat Zayed, Abu Dhabi"]
  ],
  Sharjah: [
    ["Sharjah Central Hotel", "3-star sample option", "Al Majaz, Sharjah"],
    ["Rolla Square Budget Hotel", "2-star sample option", "Rolla, Sharjah"],
    ["Al Khan Comfort Stay", "3-star sample option", "Al Khan, Sharjah"]
  ],
  "Ras Al Khaimah": [
    ["RAK City Stay Hotel", "3-star sample option", "City centre, Ras Al Khaimah"],
    ["Nakheel Budget Inn", "2-star sample option", "Nakheel, Ras Al Khaimah"]
  ],
  "Al Ain": [
    ["Al Ain Central Hotel", "3-star sample option", "Town centre, Al Ain"],
    ["Garden City Stay Inn", "2-star sample option", "Al Ain city area"]
  ],
  Fujairah: [
    ["Fujairah City Comfort Hotel", "3-star sample option", "City centre, Fujairah"],
    ["Port Road Budget Hotel", "2-star sample option", "Port Road, Fujairah"]
  ]
};

const airportTerminals = {
  DEL: "Terminal 3",
  BOM: "Terminal 2",
  BLR: "Terminal 2",
  MAA: "International Terminal",
  HYD: "International Terminal",
  CCU: "International Terminal",
  COK: "Terminal 3",
  AMD: "Terminal 2",
  GOX: "International Terminal",
  GOI: "International Terminal",
  TRV: "Terminal 2",
  CCJ: "International Terminal",
  LKO: "Terminal 3",
  ATQ: "International Terminal",
  JAI: "Terminal 2",
  IXC: "New Terminal",
  PNQ: "International Terminal",
  IXE: "International Terminal",
  IXM: "Integrated Terminal",
  CJB: "International Terminal",
  DXB: "Terminal 1",
  DWC: "Passenger Terminal",
  AUH: "Terminal A",
  SHJ: "Main Terminal",
  RKT: "Main Terminal",
  AAN: "Main Terminal",
  FJR: "Main Terminal"
};

const flightScheduleOptions = [
  { code: "EK", name: "Emirates", outbound: "09:25", inbound: "18:10", dxbTerminal: "Terminal 3", aircraft: "Boeing 777-300ER", cabin: "Economy", baggage: "30 kg checked + 7 kg cabin" },
  { code: "AI", name: "Air India", outbound: "13:15", inbound: "23:40", dxbTerminal: "Terminal 1", aircraft: "Airbus A320neo", cabin: "Economy", baggage: "25 kg checked + 7 kg cabin" },
  { code: "IX", name: "Air India Express", outbound: "04:10", inbound: "11:35", dxbTerminal: "Terminal 2", aircraft: "Boeing 737", cabin: "Economy", baggage: "20 kg checked + 7 kg cabin" },
  { code: "6E", name: "IndiGo", outbound: "18:45", inbound: "05:20", dxbTerminal: "Terminal 1", aircraft: "Airbus A321neo", cabin: "Economy", baggage: "30 kg checked + 7 kg cabin" },
  { code: "SG", name: "SpiceJet", outbound: "21:50", inbound: "07:15", dxbTerminal: "Terminal 1", aircraft: "Boeing 737 MAX", cabin: "Economy", baggage: "30 kg checked + 7 kg cabin" },
  { code: "G9", name: "Air Arabia", outbound: "03:35", inbound: "20:45", dxbTerminal: "Sharjah Main Terminal", aircraft: "Airbus A320", cabin: "Economy", baggage: "20 kg checked + 10 kg cabin" },
  { code: "EY", name: "Etihad Airways", outbound: "16:30", inbound: "02:25", dxbTerminal: "Terminal A", aircraft: "Boeing 787-9", cabin: "Economy", baggage: "30 kg checked + 7 kg cabin" }
];

let guestCount = 0;
let latestFlightData = null;
let latestHotelData = null;

init();

function init() {
  departureList.innerHTML = departureAirports
    .map(airport => `<option value="${formatAirport(airport)}"></option>`)
    .join("");

  arrivalSelect.innerHTML = uaeAirports
    .map(airport => `<option value="${airport[0]}">${formatUaeAirport(airport)}</option>`)
    .join("");

  departureInput.value = formatAirport(departureAirports[0]);
  arrivalSelect.value = "DXB";

  const checkinDate = addDays(new Date(), 6);
  const checkoutDate = addDays(checkinDate, 6);
  checkinInput.value = toInputDate(checkinDate);
  checkoutInput.value = toInputDate(checkoutDate);
  checkinInput.min = toInputDate(new Date());
  checkoutInput.min = checkinInput.value;

  addGuestRow("Guest Name", "male");
}

addGuestButton.addEventListener("click", () => addGuestRow("", "male"));

checkinInput.addEventListener("change", () => {
  const checkin = new Date(`${checkinInput.value}T12:00:00`);
  checkoutInput.min = checkinInput.value;
  if (!checkoutInput.value || new Date(`${checkoutInput.value}T12:00:00`) <= checkin) {
    checkoutInput.value = toInputDate(addDays(checkin, 6));
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();
  generateDocuments();
});

document.querySelector("#copy-flight").addEventListener("click", () => copyDocumentImage("flight", "Flight itinerary image copied. You can paste it where you need."));
document.querySelector("#copy-hotel").addEventListener("click", () => copyDocumentImage("hotel", "Hotel plan image copied. You can paste it where you need."));
document.querySelector("#download-flight").addEventListener("click", () => downloadDocumentImage("flight-itinerary.jpg", "flight"));
document.querySelector("#download-hotel").addEventListener("click", () => downloadDocumentImage("hotel-plan.jpg", "hotel"));

function addGuestRow(name, type) {
  guestCount += 1;
  const row = document.createElement("div");
  row.className = "guest-row";
  row.innerHTML = `
    <div class="field">
      <label for="guest-name-${guestCount}">Guest name</label>
      <input id="guest-name-${guestCount}" class="guest-name" type="text" value="${escapeAttribute(name)}" placeholder="Full name" />
    </div>
    <div class="field">
      <label for="guest-type-${guestCount}">Guest type</label>
      <select id="guest-type-${guestCount}" class="guest-type">
        <option value="male"${type === "male" ? " selected" : ""}>Male</option>
        <option value="female"${type === "female" ? " selected" : ""}>Female</option>
        <option value="child"${type === "child" ? " selected" : ""}>Child</option>
      </select>
    </div>
    <button class="remove-guest" type="button">Remove</button>
  `;

  row.querySelector(".remove-guest").addEventListener("click", () => {
    if (guestList.children.length > 1) row.remove();
  });

  guestList.append(row);
}

function generateDocuments() {
  const departure = findDepartureAirport(departureInput.value);
  const arrival = uaeAirports.find(airport => airport[0] === arrivalSelect.value) || uaeAirports[0];
  const checkin = new Date(`${checkinInput.value}T12:00:00`);
  const checkout = new Date(`${checkoutInput.value}T12:00:00`);
  const guests = getGuests();

  if (!departure || !checkinInput.value || !checkoutInput.value || guests.length === 0) {
    showMessage("Please select airports, dates, and at least one guest name.");
    return;
  }

  if (checkout <= checkin) {
    showMessage("Check-out date must be after check-in date.");
    return;
  }

  const outbound = buildFlight(departure, arrival, checkin, "outbound");
  const inbound = buildFlight(arrival, departure, checkout, "return");
  const hotel = buildHotel(arrival, checkin, checkout);

  latestFlightData = { outbound, inbound, guests };
  latestHotelData = { hotel, guests, arrival };
  flightDocument.innerHTML = buildFlightHtml(outbound, inbound, guests);
  hotelDocument.innerHTML = buildHotelHtml(hotel, guests);
  documentsArea.hidden = false;
  documentsArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getGuests() {
  return [...guestList.querySelectorAll(".guest-row")]
    .map(row => {
      const name = row.querySelector(".guest-name").value.trim();
      const type = row.querySelector(".guest-type").value;
      return name ? { name, type, prefix: prefixFor(type) } : null;
    })
    .filter(Boolean);
}

function buildFlight(from, to, date, direction) {
  const option = chooseFlightOption(from, to, date, direction);
  const [depHour, depMinute] = (direction === "outbound" ? option.outbound : option.inbound).split(":").map(Number);
  const durationHours = estimateDuration(from[0], to[0]);
  const departureTime = setTime(date, depHour, depMinute);
  const arrivalTime = new Date(departureTime.getTime() + durationHours * 60 * 60 * 1000);
  const numberSeed = `${from[0]}${to[0]}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const flightNumberOffset = direction === "outbound" ? 120 : 420;

  return {
    airline: { code: option.code, name: option.name },
    flightNo: `${option.code} ${numberSeed % 700 + flightNumberOffset}`,
    from,
    to,
    departureTime,
    arrivalTime,
    departureTerminal: terminalFor(from[0], option),
    arrivalTerminal: terminalFor(to[0], option),
    aircraft: option.aircraft,
    cabin: option.cabin,
    baggage: option.baggage,
    duration: formatDuration(durationHours),
    reference: `PLAN-${from[0]}${to[0]}-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`
  };
}

function buildHotel(arrival, checkin, checkout) {
  const nights = Math.max(1, Math.round((checkout - checkin) / 86400000));
  const city = arrival[2];
  const cityHotels = hotelOptions[city] || hotelOptions.Dubai;
  const selected = cityHotels[Math.floor(Math.random() * cityHotels.length)];
  return {
    name: selected[0],
    rating: selected[1],
    city,
    address: `${selected[2]}, United Arab Emirates`,
    checkin,
    checkout,
    nights,
    room: "Standard room",
    reference: `HOTEL-PLAN-${arrival[0]}-${String(checkin.getDate()).padStart(2, "0")}${String(checkout.getDate()).padStart(2, "0")}`
  };
}

function buildFlightHtml(outbound, inbound, guests) {
  return `
    <article class="doc-paper a4-paper">
      <header class="doc-header">
        <div><strong>Flight Itinerary</strong><small>Outbound and return travel plan</small></div>
        <div><strong>${outbound.reference}</strong><small>Reference</small></div>
      </header>
      <section class="doc-section">
        <div class="section-title-row">
          <h3>Passenger(s)</h3>
          <span>${guests.length} traveller${guests.length === 1 ? "" : "s"}</span>
        </div>
        <div class="guest-tags">${guests.map(guest => `<span>${escapeHtml(guest.prefix)} ${escapeHtml(guest.name)}</span>`).join("")}</div>
      </section>
      <section class="doc-section">
        <h3>Flight details</h3>
        <div class="flight-table">
          ${flightRow("Outbound", outbound)}
          ${flightRow("Return", inbound)}
        </div>
      </section>
      <section class="doc-section">
        <h3>Important information</h3>
        <div class="detail-grid">
          <div class="detail"><small>Baggage</small><strong>As per selected carrier policy</strong></div>
          <div class="detail"><small>Check-in</small><strong>Arrive early for airport formalities</strong></div>
          <div class="detail"><small>Document</small><strong>Passport and valid travel documents required</strong></div>
          <div class="detail"><small>Status</small><strong>Travel plan only</strong></div>
        </div>
      </section>
      <p class="doc-note doc-note-strong">This is a travel itinerary plan only. It is not a confirmed ticket, boarding pass, payment receipt, or airline confirmation.</p>
    </article>
  `;
}

function buildHotelHtml(hotel, guests) {
  return `
    <article class="doc-paper a4-paper">
      <header class="doc-header">
        <div><strong>Hotel Stay Plan</strong><small>Accommodation summary</small></div>
        <div><strong>${hotel.reference}</strong><small>Reference</small></div>
      </header>
      <section class="doc-section">
        <div class="section-title-row">
          <h3>Guest(s)</h3>
          <span>${guests.length} traveller${guests.length === 1 ? "" : "s"}</span>
        </div>
        <div class="guest-tags">${guests.map(guest => `<span>${escapeHtml(guest.prefix)} ${escapeHtml(guest.name)}</span>`).join("")}</div>
      </section>
      <section class="doc-section">
        <h3>Hotel details</h3>
        <div class="hotel-summary">
          <div><small>Hotel</small><strong>${escapeHtml(hotel.name)}</strong></div>
          <div><small>Category</small><strong>${escapeHtml(hotel.rating)}</strong></div>
          <div><small>City</small><strong>${escapeHtml(hotel.city)}, UAE</strong></div>
          <div><small>Area</small><strong>${escapeHtml(hotel.address)}</strong></div>
          <div><small>Check-in</small><strong>${formatDate(hotel.checkin)}</strong></div>
          <div><small>Check-out</small><strong>${formatDate(hotel.checkout)}</strong></div>
          <div><small>Stay</small><strong>${hotel.nights} night${hotel.nights === 1 ? "" : "s"}</strong></div>
          <div><small>Room</small><strong>${escapeHtml(hotel.room)}</strong></div>
        </div>
      </section>
      <section class="doc-section">
        <h3>Stay information</h3>
        <div class="detail-grid">
          <div class="detail"><small>Occupancy</small><strong>${guests.length} guest${guests.length === 1 ? "" : "s"}</strong></div>
          <div class="detail"><small>Meal plan</small><strong>Room only</strong></div>
          <div class="detail"><small>Check-in time</small><strong>14:00 local time</strong></div>
          <div class="detail"><small>Check-out time</small><strong>12:00 local time</strong></div>
        </div>
      </section>
      <p class="doc-note doc-note-strong">This is an accommodation plan only. It is not a confirmed hotel booking, voucher, payment receipt, or supplier confirmation.</p>
    </article>
  `;
}

function flightRow(title, flight) {
  return `
    <div class="flight-row">
      <div class="flight-row-title">
        <strong>${title}</strong>
        <span>${escapeHtml(flight.flightNo)}</span>
      </div>
      <div class="route-line">
        <span>${flight.from[0]}</span>
        <span>→</span>
        <span>${flight.to[0]}</span>
      </div>
      <div class="flight-meta">
        <div><small>Carrier option</small><strong>${escapeHtml(flight.airline.name)} (${escapeHtml(flight.airline.code)})</strong></div>
        <div><small>From</small><strong>${escapeHtml(flight.from[2])} (${flight.from[0]})</strong></div>
        <div><small>To</small><strong>${escapeHtml(flight.to[2])} (${flight.to[0]})</strong></div>
        <div><small>Departure</small><strong>${formatDateTime(flight.departureTime)}</strong></div>
        <div><small>Arrival</small><strong>${formatDateTime(flight.arrivalTime)}</strong></div>
        <div><small>Departure terminal</small><strong>${escapeHtml(flight.departureTerminal)}</strong></div>
        <div><small>Arrival terminal</small><strong>${escapeHtml(flight.arrivalTerminal)}</strong></div>
        <div><small>Duration</small><strong>${escapeHtml(flight.duration)}</strong></div>
        <div><small>Aircraft</small><strong>${escapeHtml(flight.aircraft)}</strong></div>
        <div><small>Baggage</small><strong>${escapeHtml(flight.baggage)}</strong></div>
        <div><small>Status</small><strong>Plan only</strong></div>
      </div>
    </div>
  `;
}

async function copyDocumentImage(kind, successMessage) {
  try {
    const blob = await documentToImageBlob(kind, "image/png");
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob })
    ]);
    showMessage(successMessage);
  } catch {
    showMessage("Copy is not available in this browser. Please use Download.");
  }
}

async function downloadDocumentImage(fileName, kind) {
  try {
    const blob = await documentToImageBlob(kind, "image/jpeg", 0.92);
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    link.rel = "noopener";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showMessage("JPEG downloaded.");
  } catch {
    showMessage("Download failed in this browser. Please try again after generating the itinerary.");
  }
}

async function documentToImageBlob(kind, type = "image/jpeg", quality = 0.92) {
  const canvas = renderDocumentCanvas(kind);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error("Could not create image."));
    }, type, quality);
  });
}

function renderDocumentCanvas(kind) {
  if (kind === "flight" && latestFlightData) return renderFlightCanvas(latestFlightData);
  if (kind === "hotel" && latestHotelData) return renderHotelCanvas(latestHotelData);
  throw new Error("Please generate the document first.");
}

function renderFlightCanvas({ outbound, inbound, guests }) {
  const page = createA4Canvas();
  const { canvas, context: ctx, width, height, margin } = page;
  drawDocumentShell(page, "FLIGHT ITINERARY", outbound.reference, "Travel plan");

  let y = 245;
  y = drawPeopleSection(ctx, guests, margin, y, width - margin * 2, "Passenger details");
  y = drawFlightSegment(ctx, "Outbound flight", outbound, margin, y + 28, width - margin * 2);
  y = drawFlightSegment(ctx, "Return flight", inbound, margin, y + 28, width - margin * 2);

  y = drawSectionTitle(ctx, "Travel information", margin, y + 34);
  const infoTop = y + 12;
  drawInfoBox(ctx, "Baggage", "As per selected carrier policy", margin, infoTop, 260, 92);
  drawInfoBox(ctx, "Airport check-in", "Arrive early for formalities", margin + 285, infoTop, 260, 92);
  drawInfoBox(ctx, "Documents", "Passport and valid travel documents required", margin + 570, infoTop, 360, 92);
  drawInfoBox(ctx, "Status", "Plan only", margin + 955, infoTop, width - margin - (margin + 955), 92);

  drawFooter(ctx, "This is a travel itinerary plan only. It is not a confirmed ticket, boarding pass, payment receipt, or airline confirmation.", margin, height);
  return canvas;
}

function renderHotelCanvas({ hotel, guests }) {
  const page = createA4Canvas();
  const { canvas, context: ctx, width, height, margin } = page;
  drawDocumentShell(page, "HOTEL STAY PLAN", hotel.reference, "Accommodation summary");

  let y = 245;
  y = drawPeopleSection(ctx, guests, margin, y, width - margin * 2, "Guest details");

  y = drawSectionTitle(ctx, "Hotel details", margin, y + 34);
  const gridTop = y + 12;
  const boxW = (width - margin * 2 - 28) / 2;
  drawInfoBox(ctx, "Hotel", hotel.name, margin, gridTop, boxW, 106);
  drawInfoBox(ctx, "Category", hotel.rating, margin + boxW + 28, gridTop, boxW, 106);
  drawInfoBox(ctx, "City", `${hotel.city}, UAE`, margin, gridTop + 130, boxW, 106);
  drawInfoBox(ctx, "Area", hotel.address, margin + boxW + 28, gridTop + 130, boxW, 106);
  drawInfoBox(ctx, "Check-in", formatDate(hotel.checkin), margin, gridTop + 260, boxW, 106);
  drawInfoBox(ctx, "Check-out", formatDate(hotel.checkout), margin + boxW + 28, gridTop + 260, boxW, 106);
  drawInfoBox(ctx, "Stay", `${hotel.nights} night${hotel.nights === 1 ? "" : "s"}`, margin, gridTop + 390, boxW, 106);
  drawInfoBox(ctx, "Room", hotel.room, margin + boxW + 28, gridTop + 390, boxW, 106);

  y = gridTop + 535;
  y = drawSectionTitle(ctx, "Stay information", margin, y);
  drawInfoBox(ctx, "Occupancy", `${guests.length} guest${guests.length === 1 ? "" : "s"}`, margin, y + 12, 260, 92);
  drawInfoBox(ctx, "Meal plan", "Room only", margin + 285, y + 12, 260, 92);
  drawInfoBox(ctx, "Check-in time", "14:00 local time", margin + 570, y + 12, 260, 92);
  drawInfoBox(ctx, "Check-out time", "12:00 local time", margin + 855, y + 12, width - margin - (margin + 855), 92);

  drawFooter(ctx, "This is an accommodation plan only. It is not a confirmed hotel booking, voucher, payment receipt, or supplier confirmation.", margin, height);
  return canvas;
}

function createA4Canvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 1240;
  canvas.height = 1754;
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  return { canvas, context, width: canvas.width, height: canvas.height, margin: 82 };
}

function drawDocumentShell(page, title, reference, subtitle) {
  const { context: ctx, width, margin } = page;
  ctx.fillStyle = "#111827";
  roundRect(ctx, margin, 70, width - margin * 2, 132, 18, true);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 34px Arial, sans-serif";
  ctx.fillText(title, margin + 32, 124);
  ctx.font = "400 20px Arial, sans-serif";
  ctx.fillText(subtitle, margin + 32, 160);
  ctx.textAlign = "right";
  ctx.font = "700 25px Arial, sans-serif";
  ctx.fillText(reference, width - margin - 32, 124);
  ctx.font = "400 18px Arial, sans-serif";
  ctx.fillText("Reference", width - margin - 32, 160);
  ctx.textAlign = "left";
}

function drawPeopleSection(ctx, people, x, y, width, title) {
  y = drawSectionTitle(ctx, title, x, y);
  const rowH = 58;
  const boxH = Math.max(145, 55 + people.length * rowH);
  ctx.strokeStyle = "#dfe3e8";
  ctx.fillStyle = "#fbfcfd";
  roundRect(ctx, x, y + 12, width, boxH, 14, true, true);
  ctx.fillStyle = "#6b7280";
  ctx.font = "700 18px Arial, sans-serif";
  ctx.fillText("Title / Name", x + 24, y + 52);
  ctx.fillText("Type", x + width - 210, y + 52);
  ctx.strokeStyle = "#e8eaed";
  line(ctx, x + 20, y + 72, x + width - 20, y + 72);
  people.forEach((person, index) => {
    const rowY = y + 112 + index * rowH;
    ctx.fillStyle = "#111827";
    ctx.font = "700 23px Arial, sans-serif";
    ctx.fillText(`${person.prefix} ${person.name}`, x + 24, rowY);
    ctx.fillStyle = "#374151";
    ctx.font = "600 20px Arial, sans-serif";
    ctx.fillText(person.type === "child" ? "Child" : "Adult", x + width - 210, rowY);
  });
  return y + boxH + 12;
}

function drawFlightSegment(ctx, title, flight, x, y, width) {
  y = drawSectionTitle(ctx, title, x, y);
  ctx.strokeStyle = "#dfe3e8";
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, x, y + 12, width, 405, 16, true, true);
  ctx.fillStyle = "#111827";
  ctx.font = "800 48px Arial, sans-serif";
  ctx.fillText(flight.from[0], x + 38, y + 94);
  ctx.textAlign = "center";
  ctx.fillStyle = "#235ee7";
  ctx.font = "800 36px Arial, sans-serif";
  ctx.fillText("→", x + width / 2, y + 91);
  ctx.fillStyle = "#111827";
  ctx.font = "800 48px Arial, sans-serif";
  ctx.fillText(flight.to[0], x + width - 86, y + 94);
  ctx.textAlign = "left";
  ctx.fillStyle = "#6b7280";
  ctx.font = "600 18px Arial, sans-serif";
  ctx.fillText(`${flight.from[2]}, ${flight.from[3] || "UAE"}`, x + 38, y + 126);
  ctx.textAlign = "right";
  ctx.fillText(`${flight.to[2]}, ${flight.to[3] || "UAE"}`, x + width - 38, y + 126);
  ctx.textAlign = "left";

  const top = y + 158;
  const w = (width - 76) / 3;
  drawInfoBox(ctx, "Carrier option", `${flight.airline.name} (${flight.airline.code})`, x + 38, top, w, 88);
  drawInfoBox(ctx, "Flight", flight.flightNo, x + 38 + w + 19, top, w, 88);
  drawInfoBox(ctx, "Duration", flight.duration, x + 38 + (w + 19) * 2, top, w, 88);
  drawInfoBox(ctx, "Departure", formatDateTime(flight.departureTime), x + 38, top + 108, (width - 95) / 2, 88);
  drawInfoBox(ctx, "Arrival", formatDateTime(flight.arrivalTime), x + 57 + (width - 95) / 2, top + 108, (width - 95) / 2, 88);
  drawInfoBox(ctx, "Departure terminal", flight.departureTerminal, x + 38, top + 216, w, 88);
  drawInfoBox(ctx, "Arrival terminal", flight.arrivalTerminal, x + 38 + w + 19, top + 216, w, 88);
  drawInfoBox(ctx, "Aircraft / baggage", `${flight.aircraft}; ${flight.baggage}`, x + 38 + (w + 19) * 2, top + 216, w, 88);
  return y + 430;
}

function drawInfoBox(ctx, label, value, x, y, width, height) {
  ctx.strokeStyle = "#e5e7eb";
  ctx.fillStyle = "#f9fafb";
  roundRect(ctx, x, y, width, height, 12, true, true);
  ctx.fillStyle = "#6b7280";
  ctx.font = "600 16px Arial, sans-serif";
  ctx.fillText(label, x + 16, y + 28);
  ctx.fillStyle = "#111827";
  ctx.font = "700 20px Arial, sans-serif";
  wrapText(ctx, value, x + 16, y + 58, width - 32, 24, 2);
}

function drawSectionTitle(ctx, title, x, y) {
  ctx.fillStyle = "#6b7280";
  ctx.font = "800 19px Arial, sans-serif";
  ctx.fillText(title.toUpperCase(), x, y);
  return y + 8;
}

function drawFooter(ctx, note, margin, height) {
  const y = height - 145;
  ctx.fillStyle = "#fffbeb";
  ctx.strokeStyle = "#f3e4b6";
  roundRect(ctx, margin, y, 1240 - margin * 2, 70, 12, true, true);
  ctx.fillStyle = "#8a6200";
  ctx.font = "700 18px Arial, sans-serif";
  wrapText(ctx, note, margin + 20, y + 30, 1240 - margin * 2 - 40, 23, 2);
  ctx.fillStyle = "#9ca3af";
  ctx.font = "500 15px Arial, sans-serif";
  ctx.fillText("Generated by Photo Standard", margin, height - 42);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text).split(/\s+/);
  let line = "";
  let lines = 0;
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      line = word;
      lines += 1;
      if (lines >= maxLines) return;
    } else {
      line = testLine;
    }
  }
  if (line && lines < maxLines) ctx.fillText(line, x, y + lines * lineHeight);
}

function roundRect(ctx, x, y, width, height, radius, fill = false, stroke = false) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function findDepartureAirport(value) {
  const code = value.trim().slice(0, 3).toUpperCase();
  return departureAirports.find(airport => airport[0] === code)
    || departureAirports.find(airport => formatAirport(airport).toLowerCase() === value.trim().toLowerCase());
}

function chooseFlightOption(from, to, date, direction) {
  const arrivalCode = direction === "outbound" ? to[0] : from[0];
  let options = flightScheduleOptions;
  if (arrivalCode === "AUH") options = flightScheduleOptions.filter(option => ["EY", "AI", "IX", "6E"].includes(option.code));
  if (arrivalCode === "SHJ" || arrivalCode === "RKT") options = flightScheduleOptions.filter(option => ["G9", "IX", "6E"].includes(option.code));
  if (arrivalCode === "DWC") options = flightScheduleOptions.filter(option => ["EK", "IX", "6E"].includes(option.code));
  if (arrivalCode === "AAN" || arrivalCode === "FJR") options = flightScheduleOptions.filter(option => ["AI", "IX", "6E"].includes(option.code));
  const seed = `${from[0]}${to[0]}${toInputDate(date)}${direction}${Date.now()}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return options[seed % options.length] || flightScheduleOptions[0];
}

function terminalFor(code, option) {
  if (code === "DXB") return option.dxbTerminal;
  if (code === "AUH") return "Terminal A";
  if (code === "SHJ") return "Main Terminal";
  if (code === "DWC") return "Passenger Terminal";
  return airportTerminals[code] || "International Terminal";
}

function estimateDuration(fromCode, toCode) {
  if (["DEL", "BOM", "AMD", "HYD", "BLR", "MAA", "COK", "CCJ", "TRV"].includes(fromCode) || ["DEL", "BOM", "AMD", "HYD", "BLR", "MAA", "COK", "CCJ", "TRV"].includes(toCode)) return 3.5;
  if (["LHR", "CDG", "AMS", "FRA"].includes(fromCode) || ["LHR", "CDG", "AMS", "FRA"].includes(toCode)) return 7.25;
  if (["JFK", "LAX", "YYZ"].includes(fromCode) || ["JFK", "LAX", "YYZ"].includes(toCode)) return 13.5;
  return 5;
}

function formatDuration(hours) {
  const totalMinutes = Math.round(hours * 60);
  const hh = Math.floor(totalMinutes / 60);
  const mm = totalMinutes % 60;
  return `${hh}h ${String(mm).padStart(2, "0")}m`;
}

function prefixFor(type) {
  if (type === "female") return "Ms.";
  if (type === "child") return "Child";
  return "Mr.";
}

function formatAirport(airport) {
  return `${airport[0]} - ${airport[1]}, ${airport[2]}, ${airport[3]}`;
}

function formatUaeAirport(airport) {
  return `${airport[0]} - ${airport[1]}, ${airport[2]}, UAE`;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function setTime(date, hour, minute) {
  const copy = new Date(date);
  copy.setHours(hour, minute, 0, 0);
  return copy;
}

function toInputDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}

function showMessage(text) {
  message.textContent = text;
  message.hidden = false;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
