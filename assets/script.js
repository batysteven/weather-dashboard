var userSubmit = document.querySelector("#user-form");
var locationInputEl = document.querySelector("#location");
var locationSearchName = document.querySelector("#location-search-name");
var forecastContainerEl = document.querySelector("#forecast-container");
var searchHistoryForecast = document.querySelector("#search-history");

var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var location = locationInputEl.value.trim();

    getWeather(location);
};

var getWeather = function(location) {
    //format apiurl w/key
    var  apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial" + "&appid=" + "291b2638328647d2c894b01fa08bcd9e";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                locationSearchName.textContent = location.toUpperCase();
                saveForecast(data, location);
                displayWeather(data.list);
            });
        }
    });
};

var displayWeather = function(daily) {
    //loop over data.list
    for (var i = 0; i < daily.length; i++) {
        if ((i == 0) || (i == 8) || (i == 16) || (i == 24) || (i == 32) || (i == 39)) {
            //grab time, temp, humidity, low temp, high temp, weather, and weather image set to var's
            var time = daily[i].dt_txt;
            var tempature = daily[i].main.temp;
            var humidity = daily[i].main.humidity;
            var highTemp = daily[i].main.temp_max;
            var lowTemp = daily[i].main.temp_min;
            var weather = daily[i].weather[0].description;
            var weatherImage = daily[i].weather[0].icon;
            var wind = daily[i].wind.speed;

            //set weather image to img element, give src and alt
            var imageEl = document.createElement("img");
            imageEl.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherImage + "@2x.png");
            imageEl.setAttribute("alt", weather);
                        
            //create, append to container, add classes for style
            var dailyEl = document.createElement("div");
            dailyEl.setAttribute("class", "card text-center");

            timeEl = document.createElement("h5");
            timeEl.append(time);

            tempEl = document.createElement("h3"); 
            tempature = tempature + "℉";
            tempEl.append(tempature);

            var weatherEl = document.createElement("p");
            weatherEl.append(weather);

            var humidityEl = document.createElement("p");
            humidity = "Humidity: " + humidity + "%"
            humidityEl.append(humidity);

            var highTempEl = document.createElement("p");
            highTemp = "High: " + highTemp + "℉";
            highTempEl.append(highTemp);

            var lowTempEl = document.createElement("p");
            lowTemp = "Low: " + lowTemp + "℉";
            lowTempEl.append(lowTemp);

            var windEl = document.createElement("p");
            wind = wind + " mph";
            windEl.append(wind);
            
            dailyEl.append(timeEl);
            dailyEl.append(tempEl);
            dailyEl.append(imageEl);
            dailyEl.append(weatherEl);
            dailyEl.append(humidityEl);
            dailyEl.append(highTempEl);
            dailyEl.append(lowTempEl);
            dailyEl.append(windEl);

            //append container to the dom
            forecastContainerEl.appendChild(dailyEl);

        } 
    }
};

var saveForecast = function(daily, location) {
    localStorage.setItem("forecast", JSON.stringify(daily));
    var forecastSaved = document.createElement("p");
    forecastSaved.textContent = location.toUpperCase();
    searchHistoryForecast.append(forecastSaved);
};

userSubmit.addEventListener("submit", formSubmitHandler);