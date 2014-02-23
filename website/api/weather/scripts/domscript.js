function timeConverter(timestamp, mode) {
    // Returns a localized (german) date time string for an unix timestamp input
    var
        dt = new Date(timestamp * 1000),
        months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        year = dt.getFullYear(),
        month = months[dt.getMonth()],
        date = dt.getDate(),
        hour = dt.getHours(),
        min = dt.getMinutes(),
        time
    ;

    switch (mode) {
        case "date":
            time = date + '. ' + month + ' ' + year;
            break;
        case "time":
            time = hour + ':' + min + ' Uhr';
            break;
        default:
        case "datetime":
            time = date + '. ' + month + ' ' + year + ', ' + hour + ':' + min + ' Uhr';
            break;
    }
    return time;
}

function getWeatherConditionClass(conditionId) {
    // Returns icon class name for common weather condition ids (openweathermap api)
    var className = '';
    conditionId = parseInt(conditionId);

    if (conditionId > 200 && conditionId < 800)
        className = "icon-rain";
    else if (conditionId === 800)
        className = "icon-clear-sky";
    else if (conditionId === 801)
        className = "icon-partly-cloudy";
    else if (conditionId > 801 && conditionID < 900)
        className = "icon-cloudy";

    return className;
}

$(function() {

    // Calls openweathermap.org API and prints current wheather condition
    var
        appid = "",
        apiBase = "http://api.openweathermap.org/data/2.5/weather?q=",
        query = "Leipzig,de&units=metric&lang=de",


        requestUrl = apiBase + query, //+ "&appid=" + appid,

        container = $("#status")
    ;

    var request = $.ajax({
        url: requestUrl,
        type: "GET",
        dataType: "json",
        ifModified: true,
        cache: false
    });

    request.done(function(response) {

        if ("object" === typeof response) {

            if (response.dt)
                var date = timeConverter(response.dt, "date");

            var
                condition = '',
                className = '';

            if (response.cod) {

                if (200 !== response.cod) {
                    switch (response.cod) {
                        case 403:
                            condition += "<p>" + response.cod + ": Zugriff nicht erlaubt</p>";
                            break;
                        case 404:
                            condition += "<p>" + response.cod + ": Ort nicht gefunden</p>";
                            break;
                        case 500:
                            condition += "<p>" + response.cod + ": Wetter kaput</p>";
                            break;
                    }
                }
                else {

                    if (response.name)
                        condition += "<p>" + response.name + "</p>";

                    if (response.weather && response.weather.length) {

                        condition += "<p>";

                        if (response.weather[0].id) {
                            className = getWeatherConditionClass(response.weather[0].id);
                            condition += "<i class='" + className + "'></i>";
                        }

                        if (response.weather[0].icon)
                            condition += "<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='' /> ";

                        if (response.weather[0].description)
                            condition += "<span>" + response.weather[0].description + "</span>";

                        condition += "</p>";
                    }
                    if (response.main &&
                        response.main.temp)
                            condition += "<p>" + response.main.temp + "°C</p>";

                    if (date)
                        condition += "<small>(aktualisiert: " + date + ")</small>";
                }

                container.html(condition);
            }

            // $("#log").html("<p></p><small>" + request.status + ': ' + request.statusText + "</small>");
        }
        console.log(response);
    });

    request.fail(function(jqXHR, textStatus) {
        $("#log").append("<p>Momentan leider kein Wetter</p><small>" + jqXHR.status + ': ' + jqXHR.statusText + "</small>");
        console.log(jqXHR);
    });
});