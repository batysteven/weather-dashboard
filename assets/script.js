var userSubmit = document.querySelector("#user-form");
var locationInputEl = document.querySelector("#location");
var locationSearchName = document.querySelector("#location-search-name");

var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var location = locationInputEl.value.trim();

    getWeather(location);
};

var getWeather = function(location) {
    //format apiurl w/key
    var  apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + "291b2638328647d2c894b01fa08bcd9e";

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
        if ((i == 0) || (i == 8) || (i == 16) || (i == 24) || (i == 32)) {
            var time = daily[i].dt_txt;
            var tempature = daily[i].main.temp;
            var humidity = daily[i].main.humidity;
            var highTemp = daily[i].main.temp_max;
            var lowTemp = daily[i].main.temp_min;
            var weather = daily[i].weather[0].description;
            var weatherImage = daily[i].weather[0].icon;
            console.log(weatherImage);
        } 
    }
};

userSubmit.addEventListener("submit", formSubmitHandler);