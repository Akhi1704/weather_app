const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "dfa82ded21a8f8626593b037fd7045f6";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("Could not fetch weather data. Please try again.");
    }
  } else {
    displayError("Please enter a city.");
  }
});

async function getWeatherData(city) {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  // Clear and show the card
  card.textContent = "";
  card.style.display = "block";

  // Create elements for weather info
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  // Populate content
  cityDisplay.textContent = `${city}`;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = `${description.charAt(0).toUpperCase() + description.slice(1)}`;
  weatherEmoji.textContent = getWeatherEmoji(id);

  // Add classes for styling
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  // Append elements to the card
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);

  // Style card for a professional appearance
  card.style.background = "linear-gradient(180deg, hsl(210, 100%, 85%), hsl(40, 100%, 70%))";
  card.style.padding = "20px";
  card.style.borderRadius = "15px";
  card.style.boxShadow = "5px 5px 15px rgba(0, 0, 0, 0.3)";
  card.style.lineHeight = "2";
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈ Thunderstorm";
    case weatherId >= 300 && weatherId < 400:
      return "🌧 Drizzle";
    case weatherId >= 500 && weatherId < 600:
      return "🌧 Rain";
    case weatherId >= 600 && weatherId < 700:
      return "❄️ Snow";
    case weatherId >= 700 && weatherId < 800:
      return "💨 Atmosphere (Mist, Smoke, etc.)";
    case weatherId === 800:
      return "☀️ Clear Sky";
    case weatherId >= 801 && weatherId < 810:
      return "☁️ Clouds";
    default:
      return "❓ Unknown Weather";
  }
}

function displayError(message) {
  card.style.display = "block"; // Ensure the card is visible for the error message
  card.textContent = ""; // Clear previous content

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.style.color = "red";
  errorDisplay.style.fontWeight = "bold";

  card.appendChild(errorDisplay);

  // Reset card style for error message
  card.style.background = "white";
  card.style.padding = "20px";
  card.style.borderRadius = "15px";
  card.style.boxShadow = "5px 5px 15px rgba(0, 0, 0, 0.3)";
}
