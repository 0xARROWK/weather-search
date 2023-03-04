// initialize sidenav for mobile menu
$('#sidenav-menu').sidenav({"edge":"right"});

// create new XMLHttpRequest on search button click
let searchButton = document.getElementById("search-weather");

searchButton.onclick = () => {

    let city = document.getElementById("search-city").value,
        url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=ee07e2bf337034f905cde0bdedae3db8';

    if (city.length !== 0) {

        showError("")

        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject();
        } else {
            showError("This browser is not supported")
            return;
        }

        xhr.open("GET", url, true);

        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4 && xhr.status === 200) {

                var res = JSON.parse(xhr.response);

                showError("")

                // adapt response results to body content
                let city = document.getElementsByClassName("results-city");
                for (c of city) c.innerHTML = res.name

                let temp = document.getElementsByClassName("results-temp");
                for (t of temp) t.innerHTML = res.main.temp

                let feels = document.getElementsByClassName("results-feels");
                for (f of feels) f.innerHTML = res.main.feels_like

                let clouds = document.getElementsByClassName("results-clouds");
                for (c of clouds) c.innerHTML = res.clouds.all

                let pressure = document.getElementsByClassName("results-pressure");
                for (p of pressure) p.innerHTML = res.main.pressure

                let humidity = document.getElementsByClassName("results-humidity");
                for (h of humidity) h.innerHTML = res.main.humidity

                let speed = document.getElementsByClassName("results-speed");
                for (s of speed) s.innerHTML = formatKMperH(res.wind.speed)

                let sunrise = document.getElementsByClassName("results-sunrise");
                for (s of sunrise) s.innerHTML = formatTimestamp(res.sys.sunrise)

                let sunset = document.getElementsByClassName("results-sunset");
                for (s of sunset) s.innerHTML = formatTimestamp(res.sys.sunset)

                let lon = document.getElementsByClassName("results-longitude");
                for (l of lon) l.innerHTML = res.coord.lon

                let lat = document.getElementsByClassName("results-latitude");
                for (l of lat) l.innerHTML = res.coord.lat

                let cc = document.getElementsByClassName("results-country-code");
                for (c of cc) c.innerHTML = res.sys.country

            } else if (xhr.status === 404) {
                showError("This city was not found.")
            } else {
                showError("Error code " + xhr.status)
            }

        };

        xhr.send();

    } else {

        showError("Please enter at least one character.")

    }

}

// show details on section click

// go back to initial details
let showInitialDetails = document.getElementsByClassName("go-back"),
    initialDetails = document.getElementById("initial-values");

for (d of showInitialDetails) {
    d.onclick = () => {
        addHideClass()
        removeHideClass(initialDetails)
    }
}

// show city details
let showCityDetails = document.getElementById("show-city-details"),
    cityDetails = document.getElementById("city-values");

showCityDetails.onclick = () => {
    addHideClass()
    removeHideClass(cityDetails)
}

// show temp details
let showTempDetails = document.getElementById("show-temperature-details"),
    tempDetails = document.getElementById("temperature-values");

showTempDetails.onclick = () => {
    addHideClass()
    removeHideClass(tempDetails)
}

// show wind details
let showWindDetails = document.getElementById("show-wind-details"),
    windDetails = document.getElementById("wind-values");

showWindDetails.onclick = () => {
    addHideClass()
    removeHideClass(windDetails)
}

// allows to hide all section by adding an hide class
function addHideClass() {

    document.getElementById("initial-values").classList.add("hide")
    document.getElementById("city-values").classList.add("hide")
    document.getElementById("temperature-values").classList.add("hide")
    document.getElementById("wind-values").classList.add("hide")

}

// allows to show a section by removing an hide class
function removeHideClass(el) {

    el.classList.remove("hide")

}

// allows to format sunrise and sunset timestamp to date
function formatTimestamp(t) {

    var date = new Date(t * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

}

// allows to convert m/s to km/h
function formatKMperH(s) {
    return (s*3.6).toFixed(2)
}

// show an error message
function showError(msg) {

    document.getElementById("error-search").innerHTML = msg

}