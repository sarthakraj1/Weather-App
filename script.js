const apiKey = config.API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        document.querySelector(".error").style.display = "none";
        
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('City not found or API error');
        }
        
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;
        
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "icons/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "icons/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "icons/rain.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "icons/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "icons/snow.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "icons/drizzle.png";
        }
        
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value;
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name");
        }
    }
});