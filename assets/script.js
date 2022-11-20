var APIKey = "c30b4ca79bfee125a1cd154f8a86fb3c";

var searchInput = document.querySelector(".searchInput")
var searchButton = document.querySelector(".searchButton")
// <script src="https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIKey}
// "></script>
// api.openweathermap.org/data/2.5/weather?q={city}&appid={API}
searchButton.addEventListneer("click", function(){
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + APIKey  
    )
})