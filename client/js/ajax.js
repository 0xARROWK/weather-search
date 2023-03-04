// initialize sidenav for mobile menu
$('#sidenav-menu').sidenav({"edge":"right"});

$(document).ready(function() {

    $('#search-weather').on('click', function() {

        let city = $('#search-city').val(),
            url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=ee07e2bf337034f905cde0bdedae3db8';

        if (city.length !== 0) {

            showError("")

            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                success: function (res) {

                    showError("")

                    // adapt response results to body content
                    $('.results-city').text(res.name)
                    $('.results-temp').text(res.main.temp)
                    $('.results-feels').text(res.main.feels_like)
                    $('.results-pressure').text(res.main.pressure)
                    $('.results-clouds').text(res.clouds.all)
                    $('.results-humidity').text(res.main.humidity)
                    $('.results-speed').text(formatKMperH(res.wind.speed))
                    $('.results-sunrise').text(formatTimestamp(res.sys.sunrise))
                    $('.results-sunset').text(formatTimestamp(res.sys.sunset))
                    $('.results-longitude').text(res.coord.lon)
                    $('.results-latitude').text(res.coord.lat)
                    $('.results-country-code').text(res.sys.country)

                },
                error: function (res) {
                    if (res.status === 404) {
                        showError("This city was not found.")
                    } else {
                        showError("Error code : " + res.status)
                    }
                }
            })

        } else {

            showError("Please enter at least one character.")

        }

    })

    // show details on section click

    // go back to initial details
    $('.go-back').on('click', function() {
        addHideClass()
        removeHideClass('#initial-values')
    })

    // show city details
    $('#show-city-details').on('click', function() {
        addHideClass()
        removeHideClass('#city-values')
    })

    // show temp details
    $('#show-temperature-details').on('click', function() {
        addHideClass()
        removeHideClass('#temperature-values')
    })

    // show wind details
    $('#show-wind-details').on('click', function() {
        addHideClass()
        removeHideClass('#wind-values')
    })

})

// allows to hide all section by adding an hide class
function addHideClass() {

    $('#initial-values').addClass("hide")
    $('#city-values').addClass("hide")
    $('#temperature-values').addClass("hide")
    $('#wind-values').addClass("hide")

}

// allows to show a section by removing an hide class
function removeHideClass(el) {

    $(el).removeClass("hide")

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

    $('#error-search').text(msg)

}