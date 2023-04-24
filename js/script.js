const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const image = document.querySelector(".image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity span");
const humidityclass = document.querySelector(".humidity");
const wind = document.querySelector(".wind span");
const windclass = document.querySelector(".wind");

search.addEventListener("click", async () => {
  const APIKey = "741c5347557fccbcb6142de7f79bfe9e";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      console.log(json.weather[0].main);

      if (json.cod === "404") {
        container.style.height = "400px";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear1.jpeg";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;
        case "Thunderstorm":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      humidityclass.style.display = "block";
      windclass.style.display = "block";
      weatherBox.style.display = "block";
      weatherDetails.style.display = "block";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
