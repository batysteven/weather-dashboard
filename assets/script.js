

var getWeather = function() {
    //format apiurl w/key
    var  apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + "London" + "&appid=" + "291b2638328647d2c894b01fa08bcd9e";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        }
    });
};

getWeather();