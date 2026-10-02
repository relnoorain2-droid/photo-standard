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
const hotelNameInput = document.querySelector("#hotel-name");
const hotelAreaInput = document.querySelector("#hotel-area");

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
  ["IXZ", "Veer Savarkar International Airport", "Port Blair", "India"],
  ["VNS", "Lal Bahadur Shastri International Airport", "Varanasi", "India"],
  ["GAU", "Lokpriya Gopinath Bordoloi International Airport", "Guwahati", "India"],
  ["CMB", "Bandaranaike International Airport", "Colombo", "Sri Lanka"],
  ["HRI", "Mattala Rajapaksa International Airport", "Hambantota", "Sri Lanka"],
  ["KHI", "Jinnah International Airport", "Karachi", "Pakistan"],
  ["LHE", "Allama Iqbal International Airport", "Lahore", "Pakistan"],
  ["ISB", "Islamabad International Airport", "Islamabad", "Pakistan"],
  ["PEW", "Bacha Khan International Airport", "Peshawar", "Pakistan"],
  ["SKT", "Sialkot International Airport", "Sialkot", "Pakistan"],
  ["MUX", "Multan International Airport", "Multan", "Pakistan"],
  ["LYP", "Faisalabad International Airport", "Faisalabad", "Pakistan"],
  ["DAC", "Hazrat Shahjalal International Airport", "Dhaka", "Bangladesh"],
  ["CGP", "Shah Amanat International Airport", "Chittagong", "Bangladesh"],
  ["ZYL", "Osmani International Airport", "Sylhet", "Bangladesh"],
  ["KTM", "Tribhuvan International Airport", "Kathmandu", "Nepal"],
  ["MLE", "Velana International Airport", "Male", "Maldives"],
  ["KBL", "Kabul International Airport", "Kabul", "Afghanistan"],
  ["MNL", "Ninoy Aquino International Airport", "Manila", "Philippines"],
  ["CGK", "Soekarno-Hatta International Airport", "Jakarta", "Indonesia"],
  ["CAI", "Cairo International Airport", "Cairo", "Egypt"],
  ["AMM", "Queen Alia International Airport", "Amman", "Jordan"],
  ["BEY", "Beirut-Rafic Hariri International Airport", "Beirut", "Lebanon"],
  ["ADD", "Addis Ababa Bole International Airport", "Addis Ababa", "Ethiopia"],
  ["NBO", "Jomo Kenyatta International Airport", "Nairobi", "Kenya"],
  ["LOS", "Murtala Muhammed International Airport", "Lagos", "Nigeria"],
  ["TAS", "Islam Karimov Tashkent International Airport", "Tashkent", "Uzbekistan"],
  ["ALA", "Almaty International Airport", "Almaty", "Kazakhstan"],
  ["SVO", "Sheremetyevo International Airport", "Moscow", "Russia"],
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

const ALL = "*";
const IN = ["India"];
const SUB = ["India", "Sri Lanka", "Pakistan", "Bangladesh", "Nepal", "Afghanistan"];
const REGIONAL = ["Sri Lanka", "Pakistan", "Bangladesh", "Nepal", "Maldives", "Afghanistan", "Egypt", "Jordan", "Lebanon", "Ethiopia", "Kenya", "Uzbekistan", "Kazakhstan", "Russia", "Saudi Arabia", "Kuwait", "Bahrain", "Oman", "Qatar", "Turkey", "India"];

// Carrier options. countries = departure countries the carrier plausibly serves; uae = UAE airports it flies to.
const flightScheduleOptions = [
  carrier("EK", "Emirates", "09:25", "18:10", "Terminal 3", "Boeing 777-300ER", "30 kg checked + 7 kg cabin", ALL, ["DXB"]),
  carrier("FZ", "flydubai", "06:40", "15:05", "Terminal 2", "Boeing 737 MAX 8", "20 kg checked + 7 kg cabin", REGIONAL, ["DXB", "DWC"]),
  carrier("EY", "Etihad Airways", "16:30", "02:25", "Terminal A", "Boeing 787-9", "30 kg checked + 7 kg cabin", ALL, ["AUH"]),
  carrier("G9", "Air Arabia", "03:35", "20:45", "Main Terminal", "Airbus A320", "20 kg checked + 10 kg cabin", REGIONAL, ["SHJ", "RKT"]),
  carrier("3L", "Air Arabia Abu Dhabi", "11:20", "22:15", "Terminal A", "Airbus A320", "20 kg checked + 10 kg cabin", SUB.concat(["Egypt", "Jordan", "Russia", "Kazakhstan", "Uzbekistan"]), ["AUH"]),
  carrier("AI", "Air India", "13:15", "23:40", "Terminal 1", "Airbus A320neo", "25 kg checked + 7 kg cabin", IN, ["DXB", "AUH", "SHJ"]),
  carrier("IX", "Air India Express", "04:10", "11:35", "Terminal 1", "Boeing 737-8", "20 kg checked + 7 kg cabin", IN, ["DXB", "AUH", "SHJ", "RKT", "AAN"]),
  carrier("6E", "IndiGo", "18:45", "05:20", "Terminal 1", "Airbus A321neo", "30 kg checked + 7 kg cabin", IN, ["DXB", "AUH", "SHJ", "RKT", "FJR"]),
  carrier("SG", "SpiceJet", "21:50", "07:15", "Terminal 1", "Boeing 737 MAX 8", "30 kg checked + 7 kg cabin", IN, ["DXB"]),
  carrier("UL", "SriLankan Airlines", "08:30", "21:55", "Terminal 1", "Airbus A330-300", "30 kg checked + 7 kg cabin", ["Sri Lanka"], ["DXB"]),
  carrier("PK", "Pakistan International Airlines", "07:50", "19:30", "Terminal 1", "Airbus A320", "30 kg checked + 7 kg cabin", ["Pakistan"], ["DXB", "AUH", "SHJ"]),
  carrier("PA", "Airblue", "10:15", "17:20", "Terminal 1", "Airbus A321", "30 kg checked + 7 kg cabin", ["Pakistan"], ["DXB", "SHJ", "AUH"]),
  carrier("ER", "SereneAir", "14:40", "20:55", "Terminal 1", "Airbus A330-200", "30 kg checked + 7 kg cabin", ["Pakistan"], ["DXB", "SHJ"]),
  carrier("9P", "Fly Jinnah", "05:25", "12:10", "Main Terminal", "Airbus A320", "20 kg checked + 7 kg cabin", ["Pakistan"], ["SHJ", "AUH"]),
  carrier("BG", "Biman Bangladesh Airlines", "12:05", "18:35", "Terminal 1", "Boeing 787-8", "30 kg checked + 7 kg cabin", ["Bangladesh"], ["DXB", "AUH"]),
  carrier("BS", "US-Bangla Airlines", "17:20", "00:45", "Terminal 1", "Airbus A330-300", "30 kg checked + 7 kg cabin", ["Bangladesh"], ["DXB", "SHJ"]),
  carrier("RA", "Nepal Airlines", "09:55", "16:40", "Terminal 1", "Airbus A320", "30 kg checked + 7 kg cabin", ["Nepal"], ["DXB"]),
  carrier("PR", "Philippine Airlines", "19:10", "01:30", "Terminal 1", "Airbus A321neo", "23 kg checked + 7 kg cabin", ["Philippines"], ["DXB"]),
  carrier("5J", "Cebu Pacific", "22:35", "04:50", "Terminal 1", "Airbus A330neo", "20 kg checked + 7 kg cabin", ["Philippines"], ["DXB"]),
  carrier("GA", "Garuda Indonesia", "18:05", "00:20", "Terminal 1", "Boeing 777-300ER", "30 kg checked + 7 kg cabin", ["Indonesia"], ["DXB"]),
  carrier("MS", "EgyptAir", "15:10", "19:45", "Terminal 1", "Boeing 737-800", "23 kg checked + 7 kg cabin", ["Egypt"], ["DXB", "AUH"]),
  carrier("RJ", "Royal Jordanian", "13:40", "18:50", "Terminal 1", "Airbus A320neo", "23 kg checked + 7 kg cabin", ["Jordan"], ["DXB", "AUH"]),
  carrier("ME", "Middle East Airlines", "11:30", "16:25", "Terminal 1", "Airbus A321neo", "23 kg checked + 7 kg cabin", ["Lebanon"], ["DXB", "AUH"]),
  carrier("ET", "Ethiopian Airlines", "10:45", "17:55", "Terminal 1", "Boeing 737 MAX 8", "23 kg checked + 7 kg cabin", ["Ethiopia"], ["DXB"]),
  carrier("KQ", "Kenya Airways", "20:15", "03:05", "Terminal 1", "Boeing 737-800", "23 kg checked + 7 kg cabin", ["Kenya"], ["DXB"]),
  carrier("HY", "Uzbekistan Airways", "08:10", "13:25", "Terminal 1", "Airbus A320neo", "23 kg checked + 7 kg cabin", ["Uzbekistan"], ["DXB"]),
  carrier("KC", "Air Astana", "07:35", "14:15", "Terminal 1", "Airbus A321neo", "23 kg checked + 7 kg cabin", ["Kazakhstan"], ["DXB"]),
  carrier("SU", "Aeroflot", "10:05", "16:50", "Terminal 1", "Airbus A330-300", "23 kg checked + 10 kg cabin", ["Russia"], ["DXB"]),
  carrier("SV", "Saudia", "12:50", "17:35", "Terminal 1", "Airbus A320neo", "23 kg checked + 7 kg cabin", ["Saudi Arabia"], ["DXB"]),
  carrier("XY", "flynas", "06:15", "10:40", "Terminal 1", "Airbus A320neo", "20 kg checked + 7 kg cabin", ["Saudi Arabia"], ["DXB"]),
  carrier("QR", "Qatar Airways", "08:45", "14:30", "Terminal 1", "Airbus A320", "30 kg checked + 7 kg cabin", ["Qatar"], ["DXB"]),
  carrier("KU", "Kuwait Airways", "14:20", "19:05", "Terminal 1", "Airbus A320neo", "30 kg checked + 7 kg cabin", ["Kuwait"], ["DXB"]),
  carrier("GF", "Gulf Air", "09:05", "13:10", "Terminal 1", "Airbus A320neo", "23 kg checked + 7 kg cabin", ["Bahrain"], ["DXB"]),
  carrier("WY", "Oman Air", "07:25", "11:15", "Terminal 1", "Boeing 737-800", "30 kg checked + 7 kg cabin", ["Oman"], ["DXB"]),
  carrier("TK", "Turkish Airlines", "01:30", "06:55", "Terminal 1", "Airbus A330-300", "30 kg checked + 8 kg cabin", ["Turkey"], ["DXB"]),
  carrier("BA", "British Airways", "20:40", "07:45", "Terminal 1", "Boeing 777-300ER", "23 kg checked + 23 kg cabin", ["United Kingdom"], ["DXB"]),
  carrier("AF", "Air France", "11:05", "00:35", "Terminal 1", "Boeing 777-200ER", "23 kg checked + 12 kg cabin", ["France"], ["DXB"]),
  carrier("LH", "Lufthansa", "10:35", "01:15", "Terminal 1", "Airbus A330-300", "23 kg checked + 8 kg cabin", ["Germany"], ["DXB"]),
  carrier("KL", "KLM Royal Dutch Airlines", "14:25", "01:55", "Terminal 1", "Boeing 787-9", "23 kg checked + 12 kg cabin", ["Netherlands"], ["DXB"]),
  carrier("SQ", "Singapore Airlines", "20:55", "09:40", "Terminal 1", "Boeing 777-300ER", "30 kg checked + 7 kg cabin", ["Singapore"], ["DXB"]),
  carrier("MH", "Malaysia Airlines", "21:10", "09:55", "Terminal 1", "Airbus A330-300", "30 kg checked + 7 kg cabin", ["Malaysia"], ["DXB"]),
  carrier("TG", "Thai Airways", "19:35", "21:50", "Terminal 1", "Boeing 777-300ER", "30 kg checked + 7 kg cabin", ["Thailand"], ["DXB"]),
  carrier("AC", "Air Canada", "21:45", "08:30", "Terminal 1", "Boeing 787-9", "23 kg checked + 10 kg cabin", ["Canada"], ["DXB"]),
  carrier("QF", "Qantas", "21:25", "10:15", "Terminal 3", "Airbus A380", "30 kg checked + 7 kg cabin", ["Australia"], ["DXB"])
];

function carrier(code, name, outbound, inbound, dxbTerminal, aircraft, baggage, countries, uae) {
  return { code, name, outbound, inbound, dxbTerminal, aircraft, cabin: "Economy", baggage, countries, uae };
}

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
document.querySelector("#download-flight").addEventListener("click", () => downloadDocumentImage(guestFileName("itinerary"), "flight"));
document.querySelector("#download-hotel").addEventListener("click", () => downloadDocumentImage(guestFileName("hotel plan"), "hotel"));

function guestFileName(label) {
  const guests = (latestFlightData && latestFlightData.guests) || getGuests();
  const lead = guests[0];
  const name = lead ? `${lead.prefix} ${lead.name}` : "Guest";
  const safe = name.replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ").trim() || "Guest";
  return `${safe} - ${label}.jpg`;
}

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
  const durationHours = estimateDuration(from, to);
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
  const customName = hotelNameInput.value.trim();
  const customArea = hotelAreaInput.value.trim();
  const selected = customName
    ? [customName, "Selected by traveller", customArea || city]
    : cityHotels[Math.floor(Math.random() * cityHotels.length)];
  return {
    name: selected[0],
    rating: selected[1],
    city,
    address: `${customArea || selected[2]}, United Arab Emirates`,
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
        <div class="carrier-head">
          <span class="carrier-badge">${escapeHtml(flight.airline.code)}</span>
          <div><strong>${title}</strong><small>${escapeHtml(flight.airline.name)}</small></div>
        </div>
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
  roundRect(ctx, x, y + 12, width, 452, 16, true, true);
  drawCarrierBadge(ctx, flight.airline.code, x + width / 2 - 34, y + 34);
  ctx.fillStyle = "#111827";
  ctx.font = "800 48px Arial, sans-serif";
  ctx.fillText(flight.from[0], x + 38, y + 94);
  ctx.textAlign = "center";
  ctx.fillStyle = "#235ee7";
  ctx.font = "800 36px Arial, sans-serif";
  ctx.fillText("→", x + width / 2, y + 128);
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

  const top = y + 150;
  const gap = 19;
  const inner = width - 76;
  const w = (inner - gap * 2) / 3;
  const half = (inner - gap) / 2;
  const col = i => x + 38 + (w + gap) * i;
  drawInfoBox(ctx, "Carrier option", `${flight.airline.name} (${flight.airline.code})`, col(0), top, w, 84);
  drawInfoBox(ctx, "Flight", flight.flightNo, col(1), top, w, 84);
  drawInfoBox(ctx, "Duration", flight.duration, col(2), top, w, 84);
  drawInfoBox(ctx, "Departure", formatDateTime(flight.departureTime), x + 38, top + 100, half, 84);
  drawInfoBox(ctx, "Arrival", formatDateTime(flight.arrivalTime), x + 38 + half + gap, top + 100, half, 84);
  drawInfoBox(ctx, "Departure terminal", flight.departureTerminal, col(0), top + 200, w, 84);
  drawInfoBox(ctx, "Arrival terminal", flight.arrivalTerminal, col(1), top + 200, w, 84);
  drawInfoBox(ctx, "Aircraft / baggage", `${flight.aircraft}; ${flight.baggage}`, col(2), top + 200, w, 84);
  return y + 470;
}

function drawCarrierBadge(ctx, code, x, y) {
  ctx.fillStyle = "#eef2f7";
  ctx.strokeStyle = "#cfd6df";
  roundRect(ctx, x, y, 68, 52, 10, true, true);
  ctx.fillStyle = "#1f2937";
  ctx.font = "800 24px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(code, x + 34, y + 35);
  ctx.textAlign = "left";
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
  const uaeAirport = direction === "outbound" ? to : from;
  const foreignAirport = direction === "outbound" ? from : to;
  const country = foreignAirport[3];
  const servesUae = option => option.uae.includes(uaeAirport[0]);
  const servesCountry = option => option.countries === ALL || option.countries.includes(country);
  let options = flightScheduleOptions.filter(option => servesUae(option) && servesCountry(option));
  // Prefer the home carrier of the departure country when one exists, alongside UAE carriers.
  if (!options.length) options = flightScheduleOptions.filter(servesUae);
  if (!options.length) options = flightScheduleOptions;
  const seed = `${from[0]}${to[0]}${toInputDate(date)}${direction}${Date.now()}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return options[seed % options.length];
}

function terminalFor(code, option) {
  if (code === "DXB") return option.dxbTerminal;
  if (code === "AUH") return "Terminal A";
  if (code === "SHJ") return "Main Terminal";
  if (code === "DWC") return "Passenger Terminal";
  return airportTerminals[code] || "International Terminal";
}

const durationByCountry = {
  India: 3.5, "Sri Lanka": 4.5, Pakistan: 2.5, Bangladesh: 5, Nepal: 4.5, Maldives: 4.25, Afghanistan: 2.75,
  Philippines: 9.25, Indonesia: 8.5, Singapore: 7.5, Malaysia: 7.25, Thailand: 6.25,
  Egypt: 3.75, Jordan: 3.25, Lebanon: 3.75, Ethiopia: 4, Kenya: 5.25, Nigeria: 8.5,
  Uzbekistan: 3.5, Kazakhstan: 4.5, Russia: 5.5, "Saudi Arabia": 2.5, Kuwait: 1.75, Bahrain: 1.25,
  Oman: 1.25, Qatar: 1.25, Turkey: 4.5, "United Kingdom": 7.25, France: 6.75, Germany: 6.25,
  Netherlands: 6.75, "United States": 14, Canada: 13.5, Australia: 14.25
};

function estimateDuration(from, to) {
  const foreign = from[3] ? from : to;
  let hours = durationByCountry[foreign[3]] || 5;
  if (foreign[0] === "LAX") hours = 16;
  if (["GAU", "CCU", "IXZ"].includes(foreign[0])) hours = 4.5;
  if (["ATQ", "IXC", "JAI", "LKO", "AMD", "BOM"].includes(foreign[0])) hours = 3;
  return hours;
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
