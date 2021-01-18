var userSubmit = document.querySelector("#user-form");
var locationInputEl = document.querySelector("#location");

var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var location = locationInputEl.value.trim();

    getWeather(location);
};

var getWeather = function(location) {
    //format apiurl w/key
    var  apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + "291b2638328647d2c894b01fa08bcd9e";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
            });
        }
    });
};

var displayWeather = function(data) {
    console.log(data);
};

userSubmit.addEventListener("submit", formSubmitHandler);