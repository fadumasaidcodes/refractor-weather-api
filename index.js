const apiKey = "3cd8358d9d4d2ea9e4780421c6abeba7";

$(document).ready(function() {
  $("#submitBtn").click(getWeather);

  function getWeather(e) {
    e.preventDefault();

    const city = $("#city").val();
    let weatherData = JSON.parse(localStorage.getItem(city));

    if (!weatherData) {
      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        dataType: "json",
        success: function(data) {
          weatherData = data;
          localStorage.setItem(city, JSON.stringify(data));
          displayWeather();
        }
      });
    } else {
      displayWeather();
    }

    function displayWeather() {
      $("#weather-info").html(`
        <h2>Weather in ${weatherData.name}:</h2>
        <p>Temperature: ${weatherData.main.temp}&deg;C</p>
        <p>Feels like: ${weatherData.main.feels_like}&deg;C</p>
        <p>Min. temperature: ${weatherData.main.temp_min}&deg;C</p>
        <p>Max. temperature: ${weatherData.main.temp_max}&deg;C</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
      `);
    }
  }
});
