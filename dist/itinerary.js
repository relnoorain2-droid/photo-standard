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

let guestCount = 0;
let latestFlightText = "";
let latestHotelText = "";

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

document.querySelector("#copy-flight").addEventListener("click", () => copyDocumentImage(flightDocument, "Flight plan JPEG copied."));
document.querySelector("#copy-hotel").addEventListener("click", () => copyDocumentImage(hotelDocument, "Hotel plan JPEG copied."));
document.querySelector("#download-flight").addEventListener("click", () => downloadDocumentImage("flight-itinerary.jpg", flightDocument));
document.querySelector("#download-hotel").addEventListener("click", () => downloadDocumentImage("hotel-plan.jpg", hotelDocument));

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

  latestFlightText = buildFlightText(outbound, inbound, guests);
  latestHotelText = buildHotelText(hotel, guests);
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
  const depHour = direction === "outbound" ? 9 : 18;
  const depMinute = direction === "outbound" ? 25 : 10;
  const durationHours = estimateDuration(from[0], to[0]);
  const departureTime = setTime(date, depHour, depMinute);
  const arrivalTime = new Date(departureTime.getTime() + durationHours * 60 * 60 * 1000);
  const airline = chooseAirline(to[0]);
  const numberSeed = `${from[0]}${to[0]}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return {
    airline,
    flightNo: `${airline.code} ${numberSeed % 800 + 120}`,
    from,
    to,
    departureTime,
    arrivalTime,
    reference: `PLAN-${from[0]}${to[0]}-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`
  };
}

function buildHotel(arrival, checkin, checkout) {
  const nights = Math.max(1, Math.round((checkout - checkin) / 86400000));
  const city = arrival[2];
  return {
    name: `${city} Central Hotel`,
    city,
    address: `${city} city area, United Arab Emirates`,
    checkin,
    checkout,
    nights,
    room: "Standard room",
    reference: `HOTEL-PLAN-${arrival[0]}-${String(checkin.getDate()).padStart(2, "0")}${String(checkout.getDate()).padStart(2, "0")}`
  };
}

function buildFlightHtml(outbound, inbound, guests) {
  return `
    <article class="doc-paper">
      <header class="doc-header">
        <div><strong>Flight Itinerary Plan</strong><small>Travel plan / not an issued ticket</small></div>
        <div><strong>${outbound.reference}</strong><small>Reference</small></div>
      </header>
      ${flightSection("Outbound", outbound)}
      ${flightSection("Return", inbound)}
      <section class="doc-section">
        <h3>Guests</h3>
        <div class="guest-tags">${guests.map(guest => `<span>${escapeHtml(guest.prefix)} ${escapeHtml(guest.name)}</span>`).join("")}</div>
        <p class="doc-note">This document is an itinerary plan only. It is not a confirmed ticket, boarding pass, payment receipt, or airline confirmation.</p>
      </section>
    </article>
  `;
}

function buildHotelHtml(hotel, guests) {
  return `
    <article class="doc-paper">
      <header class="doc-header">
        <div><strong>Hotel Stay Plan</strong><small>Accommodation plan / not a confirmed booking</small></div>
        <div><strong>${hotel.reference}</strong><small>Reference</small></div>
      </header>
      <section class="doc-section">
        <h3>Hotel</h3>
        <div class="detail-grid">
          <div class="detail"><small>Hotel</small><strong>${escapeHtml(hotel.name)}</strong></div>
          <div class="detail"><small>City</small><strong>${escapeHtml(hotel.city)}, UAE</strong></div>
          <div class="detail"><small>Check-in</small><strong>${formatDate(hotel.checkin)}</strong></div>
          <div class="detail"><small>Check-out</small><strong>${formatDate(hotel.checkout)}</strong></div>
          <div class="detail"><small>Stay</small><strong>${hotel.nights} night${hotel.nights === 1 ? "" : "s"}</strong></div>
          <div class="detail"><small>Room</small><strong>${escapeHtml(hotel.room)}</strong></div>
        </div>
      </section>
      <section class="doc-section">
        <h3>Guests</h3>
        <div class="guest-tags">${guests.map(guest => `<span>${escapeHtml(guest.prefix)} ${escapeHtml(guest.name)}</span>`).join("")}</div>
        <p class="doc-note">This document is a hotel stay plan only. It is not a confirmed hotel booking, voucher, payment receipt, or supplier confirmation.</p>
      </section>
    </article>
  `;
}

function flightSection(title, flight) {
  return `
    <section class="doc-section">
      <h3>${title}</h3>
      <div class="route-line">
        <span>${flight.from[0]}</span>
        <span>→</span>
        <span>${flight.to[0]}</span>
      </div>
      <div class="detail-grid" style="margin-top: 12px;">
        <div class="detail"><small>Airline</small><strong><span class="airline-badge">${escapeHtml(flight.airline.code)}</span> ${escapeHtml(flight.airline.name)}</strong></div>
        <div class="detail"><small>Flight</small><strong>${escapeHtml(flight.flightNo)}</strong></div>
        <div class="detail"><small>From</small><strong>${escapeHtml(flight.from[2])} (${flight.from[0]})</strong></div>
        <div class="detail"><small>To</small><strong>${escapeHtml(flight.to[2])} (${flight.to[0]})</strong></div>
        <div class="detail"><small>Departure</small><strong>${formatDateTime(flight.departureTime)}</strong></div>
        <div class="detail"><small>Arrival</small><strong>${formatDateTime(flight.arrivalTime)}</strong></div>
      </div>
    </section>
  `;
}

function buildFlightText(outbound, inbound, guests) {
  return [
    "Flight Itinerary Plan - not an issued ticket",
    `${outbound.from[2]} (${outbound.from[0]}) to ${outbound.to[2]} (${outbound.to[0]})`,
    `Outbound: ${outbound.flightNo}, ${formatDateTime(outbound.departureTime)} to ${formatDateTime(outbound.arrivalTime)}`,
    `Return: ${inbound.flightNo}, ${formatDateTime(inbound.departureTime)} to ${formatDateTime(inbound.arrivalTime)}`,
    `Guests: ${guests.map(guest => `${guest.prefix} ${guest.name}`).join(", ")}`,
    "Note: This is a travel plan only, not a confirmed airline ticket."
  ].join("\n");
}

function buildHotelText(hotel, guests) {
  return [
    "Hotel Stay Plan - not a confirmed booking",
    `${hotel.name}, ${hotel.city}, UAE`,
    `Check-in: ${formatDate(hotel.checkin)}`,
    `Check-out: ${formatDate(hotel.checkout)}`,
    `Stay: ${hotel.nights} night${hotel.nights === 1 ? "" : "s"}`,
    `Guests: ${guests.map(guest => `${guest.prefix} ${guest.name}`).join(", ")}`,
    "Note: This is an accommodation plan only, not a confirmed hotel booking."
  ].join("\n");
}

async function copyDocumentImage(element, successMessage) {
  try {
    const blob = await elementToJpegBlob(element);
    await navigator.clipboard.write([
      new ClipboardItem({ "image/jpeg": blob })
    ]);
    showMessage(successMessage);
  } catch {
    showMessage("JPEG copy is not available in this browser. Please use Download.");
  }
}

async function downloadDocumentImage(fileName, element) {
  const blob = await elementToJpegBlob(element);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function elementToJpegBlob(element) {
  await document.fonts?.ready;
  const paper = element.querySelector(".doc-paper") || element;
  const box = paper.getBoundingClientRect();
  const width = Math.ceil(box.width);
  const height = Math.ceil(box.height);
  const clone = paper.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

  const style = document.createElement("style");
  style.textContent = getPageCss();
  clone.prepend(style);

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">
        ${serialized}
      </foreignObject>
    </svg>
  `;

  const image = await loadSvgImage(svg);
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.scale(scale, scale);
  context.drawImage(image, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error("Could not create JPEG."));
    }, "image/jpeg", 0.92);
  });
}

function getPageCss() {
  return [...document.styleSheets]
    .map(sheet => {
      try {
        return [...sheet.cssRules].map(rule => rule.cssText).join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");
}

function loadSvgImage(svg) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not render JPEG."));
    };
    image.src = url;
  });
}

function findDepartureAirport(value) {
  const code = value.trim().slice(0, 3).toUpperCase();
  return departureAirports.find(airport => airport[0] === code)
    || departureAirports.find(airport => formatAirport(airport).toLowerCase() === value.trim().toLowerCase());
}

function chooseAirline(arrivalCode) {
  if (arrivalCode === "DXB" || arrivalCode === "DWC") return { code: "EK", name: "Emirates" };
  if (arrivalCode === "AUH") return { code: "EY", name: "Etihad Airways" };
  if (arrivalCode === "SHJ" || arrivalCode === "RKT") return { code: "G9", name: "Air Arabia" };
  return { code: "6E", name: "IndiGo" };
}

function estimateDuration(fromCode, toCode) {
  if (["DEL", "BOM", "AMD", "HYD", "BLR", "MAA", "COK", "CCJ", "TRV"].includes(fromCode) || ["DEL", "BOM", "AMD", "HYD", "BLR", "MAA", "COK", "CCJ", "TRV"].includes(toCode)) return 3.5;
  if (["LHR", "CDG", "AMS", "FRA"].includes(fromCode) || ["LHR", "CDG", "AMS", "FRA"].includes(toCode)) return 7.25;
  if (["JFK", "LAX", "YYZ"].includes(fromCode) || ["JFK", "LAX", "YYZ"].includes(toCode)) return 13.5;
  return 5;
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
