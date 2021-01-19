var userSubmit = document.querySelector("#user-form");
var locationInputEl = document.querySelector("#location");
var locationSearchName = document.querySelector("#location-search-name");
var forecastContainerEl = document.querySelector("#forecast-container");

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
                locationSearchName.textContent.toUpperCase = location;
                displayWeather(data.list);
            });
        }
    });
};

var displayWeather = function(daily) {
    console.log(daily);
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

            //set weather image to img element and give class for style
            var imageEl = document.createElement("img");
            imageEl.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherImage + ".png");
            imageEl.setAttribute("class", "img-thumbnail");
                        
            //create and append to container
            var dailyEl = document.createElement("div");
            dailyEl.append(time);
            dailyEl.append(tempature);
            dailyEl.append(imageEl);
            dailyEl.append(weather);
            dailyEl.append(humidity);
            dailyEl.append(highTemp);
            dailyEl.append(lowTemp);
            dailyEl.append(wind);

            //append container to the dom
            forecastContainerEl.appendChild(dailyEl);

        } 
    }
};

userSubmit.addEventListener("submit", formSubmitHandler);