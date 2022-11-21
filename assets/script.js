var APIKey = "c30b4ca79bfee125a1cd154f8a86fb3c";

var searchInput = document.querySelector(".searchInput")
var searchButton = document.querySelector(".searchButton")
var results = document.querySelector(".results")
var cityDate = document.getElementById("cityDate")
var temp = document.getElementById("temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var searchHistoryContainer = document.getElementById("history")
var iconURL = "<img src = 'http://openweathermap.org/img/wn/"


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var today = "(" + mm + "/" + dd + "/" + yyyy + ")"

var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

function renderSearchHistory() {
    searchHistoryContainer.innerHTML = " ";

    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-controls', 'today forecast');
        btn.classList.add('history-btn', 'btn-history');

        btn.setAttribute('data-search', searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);
    }
}

renderSearchHistory();

function appendToHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    renderSearchHistory();
}

function localSearchHistory() {
    var storedHistory = localStorage.getItem('search-history');
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
    renderSearchHistory();
}

function historyList(searchValue) {
    var historyBtn = document.createElement("button");
    historyBtn.textContent = searchValue;
    searchHistoryContainer.append(searchValue);
    searchHistory.push(searchValue);
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
}

function forecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);

            for (var i = 4; response.list.length; i = i + 8) {
                var temp = $("<p>").text(response.list[i].main.temp)



                $("#forecastDiv").append(temp)
            }

        })
}

// fetch info
searchButton.addEventListener("click", function(event){
    event.preventDefault()
    historyList(searchInput.value)
   fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&units=imperial" + "&appid=" + APIKey)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
    // insert info into hmtl
        var cityR = response["name"]
        var tempR = response["main"]["temp"];
        var windR = response["wind"]["speed"];
        var humidityR = response["main"]["humidity"];
        var iconR = response["weather"][0]["icon"];

    results.style.outline = "solid"
    cityDate.innerHTML = cityR + " " + today + iconURL + iconR +".png'>"
    temp.innerHTML = "Temp: " + tempR + " °F";
    wind.innerHTML = "Wind: " + windR + " MPH";
    humidity.innerHTML = "Humidity: " + humidityR + "%";
    forecast(response.coord.lat, response.coord.lon);

    });
    
});
