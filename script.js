// INITIALIZING THE MAP

var map = L.map("map").setView([0, 0], 8);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// CURRENCY VARIABLES + BUTTON

let devise = document.getElementById("devise");
let from = document.getElementById("from");
let to = document.getElementById("to");
let amount = document.getElementById("amount");
let result = document.getElementById("result");
let button = document.getElementById("send");
button.addEventListener("click", getRates);

// CURRENCY FUNTION

async function getRates() {
  let fromCurrency = from.value;
  let toCurrency = to.value;
  let amountCurrency = amount.value;

  const key = "8e6de312f853558d57237b5ffe9f9618";
  const requestString = `https://api.currencybeacon.com/v1/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amountCurrency}&api_key=${key}`;
  const dataRates = await fetch(requestString);
  console.log(dataRates);
  let responseRates = await dataRates.json();
  console.log(responseRates);

  result.textContent = `${amountCurrency} ${fromCurrency} = ${responseRates.response.value} ${toCurrency}`;
}

getRates();

// WEATHER VARIABLES + BUTTON

let city = document.getElementById("city");
let date = document.getElementById("date");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let uv = document.getElementById("uv");
let temperature = document.getElementById("temperature");
let icon = document.getElementById("icon");
let submit = document.getElementById("submit");
submit.addEventListener("click", getWeather);

// MUSEUMS VARIABLES + BUTTON

let museums = document.getElementById("searchMuseums");
museums.addEventListener("click", getMuseums);

// FOOD VARIABLES + BUTTON

let food = document.getElementById("searchFood");
food.addEventListener("click", getFood);

// ARCHITECTURE VARIABLES + BUTTON

let architecture = document.getElementById("searchArchitecture");
architecture.addEventListener("click", getArchitecture);

// BEACH VARIABLES + BUTTON

let beach = document.getElementById("searchBeach");
beach.addEventListener("click", getBeach);

// VP VARIABLES + BUTTON

let vp = document.getElementById("searchVP");
vp.addEventListener("click", getVP);

// HOSTELS VARIABLES + BUTTON

let hostels = document.getElementById("searchHostels");
hostels.addEventListener("click", getHostels);

// HOSTELS VARIABLES + BUTTON

let bars = document.getElementById("searchBars");
bars.addEventListener("click", getBars);

// FUNCTION GETWEATHER

async function getWeather() {
  let cityWeather = city.value;

  const weatherKey = "f5cf8d804b794358b43131840232203";
  const requestString = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${cityWeather}&aqi=no`;
  const dataWeather = await fetch(requestString);
  console.log(dataWeather);
  let responseWeather = await dataWeather.json();
  console.log(responseWeather);

  useWeatherData(responseWeather);

  date.textContent = `Date:${responseWeather.location.localtime}`;
  humidity.textContent = `Humidity:${responseWeather.current.humidity}`;
  wind.textContent = `Wind:${responseWeather.current.wind_kph}`;
  uv.textContent = `UV:${responseWeather.current.uv}`;
  temperature.textContent = `Temperature:${responseWeather.current.temp_c}°C`;
  icon.src = responseWeather.current.condition.icon;
}

// FUNCTION USEWEATHERDATA

function useWeatherData(responseWeather) {
  const weatherContainer = document.querySelector(".weatherBlock");

  weatherContainer.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card-weather";
  card.style = "color : white";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.appendChild(cardBody);

  const city = document.createElement("h5");
  city.className = "city-name";
  city.textContent = responseWeather.location.name;
  cardBody.appendChild(city);

  const image = document.createElement("img");
  image.className = "icon";
  image.src = responseWeather.current.condition.icon;
  cardBody.appendChild(image);

  const date = document.createElement("p");
  date.className = "date";
  date.textContent = responseWeather.location.localtime;
  cardBody.appendChild(date);

  const humidity = document.createElement("p");
  humidity.className = "humidity";
  humidity.textContent = `Humidity: ${responseWeather.current.humidity}%`;
  cardBody.appendChild(humidity);

  const wind = document.createElement("p");
  wind.className = "wind";
  wind.textContent = `Wind: ${responseWeather.current.wind_kph} kph`;
  cardBody.appendChild(wind);

  const uv = document.createElement("p");
  uv.className = "uv";
  uv.textContent = `UV: ${responseWeather.current.uv}`;
  cardBody.appendChild(uv);

  const temperature = document.createElement("p");
  temperature.className = "temperature";
  temperature.textContent = `Temperature: ${responseWeather.current.temp_c} °`;
  cardBody.appendChild(temperature);

  weatherContainer.appendChild(card);
}

useWeatherData(responseWeather);

// FUNCTION GETMUSEUMS

async function getMuseums() {
  const placesSearch = city.value;
  const requestString = `https://geocode.maps.co/search?q=${placesSearch}`;
  const dataPlaces = await fetch(requestString);
  console.log(dataPlaces);
  let responsePlaces = await dataPlaces.json();
  console.log(responsePlaces);
  const latitude = responsePlaces[0].lat;
  const longitude = responsePlaces[0].lon;
  console.log(latitude);
  console.log(longitude);

  const opentripKey =
    "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
  const requestMuseums = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=museums&rate=3&limit=8&apikey=${opentripKey}`;
  const dataMuseums = await fetch(requestMuseums);
  console.log(dataMuseums);
  let responseMuseums = await dataMuseums.json();
  console.log(responseMuseums);

  let museumsContainer = document.querySelector(".museumsContainer");
  museumsContainer.innerHTML = "";

  for (let i = 0; i < responseMuseums.features.length; i++) {
    const xid = responseMuseums.features[i].properties.xid;
    const opentripKey =
      "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
    const requestXid = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${opentripKey}`;
    const dataXid = await fetch(requestXid);
    console.log(dataXid);
    let responseXid = await dataXid.json();
    console.log(responseXid);

    const cardMuseum = document.createElement("div");
    cardMuseum.className = "card";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = responseXid.preview.source;
    cardMuseum.appendChild(cardImg);

    const cardName = document.createElement("div");
    cardName.className = "card-name";
    cardName.textContent = responseXid.name;
    cardMuseum.appendChild(cardName);

    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
    cardInfo.textContent = `${responseXid.address.city} ${responseXid.address.postcode}`;
    cardMuseum.appendChild(cardInfo);

    const buttonMap = document.createElement("a");
    buttonMap.className = "btn btn-outline-dark";
    buttonMap.textContent = "Voir sur OpenTripMap";
    buttonMap.setAttribute("href", responseXid.otm);
    buttonMap.setAttribute("target", "_blank");
    cardMuseum.appendChild(buttonMap);

    museumsContainer.appendChild(cardMuseum);
  }
}

getMuseums();

// FUNCTION GETFOOD

async function getFood() {
  const placesSearch = city.value;
  const opentripKey =
    "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
  const requestString = `https://geocode.maps.co/search?q=${placesSearch}`;
  const dataPlaces = await fetch(requestString);
  console.log(dataPlaces);
  let responsePlaces = await dataPlaces.json();
  console.log(responsePlaces);
  const latitude = responsePlaces[0].lat;
  const longitude = responsePlaces[0].lon;
  console.log(latitude);
  console.log(longitude);

  const requestFood = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=foods&rate=3&limit=9&apikey=${opentripKey}`;
  const dataFood = await fetch(requestFood);
  console.log(dataFood);
  let responseFood = await dataFood.json();
  console.log(responseFood);

  // let foodContainer = document.querySelector(".foodContainer");
  // foodContainer.innerHTML = '';

  for (let i = 0; i < responseFood.features.length; i++) {
    const xid = responseFood.features[i].properties.xid;
    const opentripKey =
      "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
    const requestXid = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${opentripKey}`;
    const dataXid = await fetch(requestXid);
    console.log(dataXid);
    let responseXid = await dataXid.json();
    console.log(responseXid);

    let foodIcon = L.icon({
      iconUrl: "img/food-marker.png",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const img = document.createElement("img");
    img.src = responseXid.preview.source;
    img.className = "food-img";

    const lat = responseXid.point.lat;
    const lng = responseXid.point.lon;
    const marker = L.marker([lat, lng], { icon: foodIcon }).addTo(map);

    marker.setLatLng([lat, lng]);
    marker
      .bindPopup(
        `<div><b>${responseXid.name}</b></div>
                          <div>${img.outerHTML}</div>
                          <div>${responseXid.address.city}, ${responseXid.address.postcode}</div>
                          <div><a href="${responseXid.otm}" target="_blank">more information</a></div>`
      )
      .openPopup();

    map.setView([lat, lng], 12);
  }
}

getFood();

// FUNCTION GETARCHITECTURE

async function getArchitecture() {
  const placesSearch = city.value;
  const requestString = `https://geocode.maps.co/search?q=${placesSearch}`;
  const dataPlaces = await fetch(requestString);
  console.log(dataPlaces);

  let responsePlaces = await dataPlaces.json();
  console.log(responsePlaces);

  const latitude = responsePlaces[0].lat;
  const longitude = responsePlaces[0].lon;

  console.log(latitude);
  console.log(longitude);

  const opentripKey =
    "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
  const requestArchitecture = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=architecture&rate=3&limit=8&apikey=${opentripKey}`;
  const dataArchitecture = await fetch(requestArchitecture);
  console.log(dataArchitecture);
  let responseArchitecture = await dataArchitecture.json();
  console.log(responseArchitecture);

  let foodContainer = document.querySelector(".architectureContainer");
  foodContainer.innerHTML = "";

  for (let i = 0; i < responseArchitecture.features.length; i++) {
    const xid = responseArchitecture.features[i].properties.xid;
    const opentripKey =
      "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";

    const requestXid = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${opentripKey}`;
    const dataXid = await fetch(requestXid);
    console.log(dataXid);
    let responseXid = await dataXid.json();
    console.log(responseXid);

    const cardArchitecture = document.createElement("div");
    cardArchitecture.className = "card";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = responseXid.preview.source;
    cardArchitecture.appendChild(cardImg);

    const cardName = document.createElement("div");
    cardName.className = "card-name";
    cardName.textContent = responseXid.name;
    cardArchitecture.appendChild(cardName);

    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
    cardInfo.textContent = `${responseXid.address.city} ${responseXid.address.postcode}`;
    cardArchitecture.appendChild(cardInfo);

    const buttonMap = document.createElement("a");
    buttonMap.className = "btn btn-outline-dark";
    buttonMap.textContent = "Voir sur OpenTripMap";
    buttonMap.setAttribute("href", responseXid.otm);
    buttonMap.setAttribute("target", "_blank");
    cardArchitecture.appendChild(buttonMap);

    foodContainer.appendChild(cardArchitecture);
  }
}

getArchitecture();

// FUNCTION GETBEACH

async function getBeach() {
  const placesSearch = city.value;
  const requestString = `https://geocode.maps.co/search?q=${placesSearch}`;
  const dataPlaces = await fetch(requestString);
  console.log(dataPlaces);
  let responsePlaces = await dataPlaces.json();
  console.log(responsePlaces);
  const latitude = responsePlaces[0].lat;
  const longitude = responsePlaces[0].lon;
  console.log(latitude);
  console.log(longitude);

  const opentripKey =
    "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
  const requestBeach = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=beaches&limit=9&apikey=${opentripKey}`;
  const dataBeach = await fetch(requestBeach);
  console.log(dataBeach);
  let responseBeach = await dataBeach.json();
  console.log(responseBeach);

  for (let i = 0; i < responseBeach.features.length; i++) {
    const xid = responseBeach.features[i].properties.xid;
    const opentripKey =
      "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";

    const requestXid = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${opentripKey}`;
    const dataXid = await fetch(requestXid);
    console.log(dataXid);
    let responseXid = await dataXid.json();
    console.log(responseXid);

    let beachIcon = L.icon({
      iconUrl: "img/beach-marker.png",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const lat = responseXid.point.lat;
    const lng = responseXid.point.lon;
    const marker = L.marker([lat, lng], { icon: beachIcon }).addTo(map);
    marker.setLatLng([lat, lng]);
    marker
      .bindPopup(
        `<b>${responseXid.name}</b><br>${responseXid.address.city}, ${responseXid.address.postcode}<br><a href="${responseXid.otm}" target="_blank">more information</a>`
      )
      .openPopup();
    map.setView([lat, lng], 12);
  }
}

getBeach();

// FUNCTION GETVP

async function getVP() {
  const placesSearch = city.value;
  const requestString = `https://geocode.maps.co/search?q=${placesSearch}`;
  const dataPlaces = await fetch(requestString);
  console.log(dataPlaces);
  let responsePlaces = await dataPlaces.json();
  console.log(responsePlaces);
  const latitude = responsePlaces[0].lat;
  const longitude = responsePlaces[0].lon;
  console.log(latitude);
  console.log(longitude);
  const opentripKey =
    "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
  const requestVP = `https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=${longitude}&lat=${latitude}&kinds=view_points&rate=1&limit=8&apikey=${opentripKey}`;
  const dataVP = await fetch(requestVP);
  console.log(dataVP);
  let responseVP = await dataVP.json();
  console.log(responseVP);

  let vpContainer = document.querySelector(".vpContainer");
  vpContainer.innerHTML = "";

  for (let i = 0; i < responseVP.features.length; i++) {
    const xid = responseVP.features[i].properties.xid;
    const opentripKey =
      "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
    const requestXid = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${opentripKey}`;
    const dataXid = await fetch(requestXid);
    console.log(dataXid);
    let responseXid = await dataXid.json();
    console.log(responseXid);

    const cardVP = document.createElement("div");
    cardVP.className = "card";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = responseXid.preview.source;
    cardVP.appendChild(cardImg);

    const cardName = document.createElement("div");
    cardName.className = "card-title";
    cardName.textContent = responseXid.name;
    cardVP.appendChild(cardName);

    const cardInfo = document.createElement("div");
    cardInfo.className = "card-text";
    cardInfo.textContent = `${responseXid.address.city} ${responseXid.address.postcode}`;
    cardVP.appendChild(cardInfo);

    const buttonMap = document.createElement("a");
    buttonMap.className = "btn btn-outline-dark";
    buttonMap.textContent = "Voir sur OpenTripMap";
    buttonMap.setAttribute("href", responseXid.otm);
    buttonMap.setAttribute("target", "_blank");
    cardVP.appendChild(buttonMap);

    vpContainer.appendChild(cardVP);
  }
}

getVP();

// FUNCTION GETHOSTELS

async function getHostels() {
  const placesSearch = city.value;
  const requestString = `https://geocode.maps.co/search?q=${placesSearch}`;
  const dataPlaces = await fetch(requestString);
  console.log(dataPlaces);
  let responsePlaces = await dataPlaces.json();
  console.log(responsePlaces);
  const latitude = responsePlaces[0].lat;
  const longitude = responsePlaces[0].lon;
  console.log(latitude);
  console.log(longitude);

  const opentripKey =
    "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";
  const requestHostels = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=hostels&rate=2&limit=9&apikey=${opentripKey}`;
  const dataHostels = await fetch(requestHostels);
  console.log(dataHostels);
  let responseHostels = await dataHostels.json();
  console.log(responseHostels);

  for (let i = 0; i < responseHostels.features.length; i++) {
    const xid = responseHostels.features[i].properties.xid;
    const opentripKey =
      "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";

    const requestXid = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${opentripKey}`;
    const dataXid = await fetch(requestXid);
    console.log(dataXid);
    let responseXid = await dataXid.json();
    console.log(responseXid);

    let issIcon = L.icon({
      iconUrl: "img/hotel-marker.png",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const lat = responseXid.point.lat;
    const lng = responseXid.point.lon;
    const marker = L.marker([lat, lng], { icon: issIcon }).addTo(map);
    marker.setLatLng([lat, lng]);
    marker
      .bindPopup(
        `<b>${responseXid.name}</b><br>${responseXid.address.city}, ${responseXid.address.postcode}<br><a href="${responseXid.url}" target="_blank">book here</a>`
      )
      .openPopup();
    map.setView([lat, lng], 12);
  }
}

getHostels();

async function getBars() {
  const placesSearch = city.value;
  const requestString = `https://geocode.maps.co/search?q=${placesSearch}`;
  const dataPlaces = await fetch(requestString);
  console.log(dataPlaces);
  let responsePlaces = await dataPlaces.json();
  console.log(responsePlaces);
  const latitude = responsePlaces[0].lat;
  const longitude = responsePlaces[0].lon;
  console.log(latitude);
  console.log(longitude);
  const opentripKey =
    "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";

  const requestBars = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=bars&limit=8&apikey=${opentripKey}`;
  const dataBars = await fetch(requestBars);
  console.log(dataBars);
  let responseBars = await dataBars.json();
  console.log(responseBars);

  for (let i = 0; i < responseBars.features.length; i++) {
    const xid = responseBars.features[i].properties.xid;
    const opentripKey =
      "5ae2e3f221c38a28845f05b6c8cb92f0bc450453b786ce4566a0e18f";

    const requestXid = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${opentripKey}`;
    const dataXid = await fetch(requestXid);
    console.log(dataXid);
    let responseXid = await dataXid.json();
    console.log(responseXid);

    let barIcon = L.icon({
      iconUrl: "img/bar-marker.png",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const lat = responseXid.point.lat;
    const lng = responseXid.point.lon;
    const marker = L.marker([lat, lng], { icon: barIcon }).addTo(map);
    marker.setLatLng([lat, lng]);
    marker
      .bindPopup(
        `<b>${responseXid.name}</b><br>${responseXid.address.city}, ${responseXid.address.postcode}<br><a href="${responseXid.otm}" target="_blank">more information</a>`
      )
      .openPopup();
    map.setView([lat, lng], 12);
  }
}

getBars();
