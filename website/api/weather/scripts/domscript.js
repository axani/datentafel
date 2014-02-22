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

$(function() {

    // Calls openweathermap.org API and prints current wheather status
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

            var status = '';

            if (response.cod) {

                if (200 !== response.cod) {
                    switch (response.cod) {
                        case 403:
                            status += "<p>" + response.cod + ": Zugriff nicht erlaubt</p>";
                            break;
                        case 404:
                            status += "<p>" + response.cod + ": Ort nicht gefunden</p>";
                            break;
                        case 500:
                            status += "<p>" + response.cod + ": Wetter kaput</p>";
                            break;
                    }
                }
                else {

                    if (response.name)
                        status += "<p>" + response.name + "</p>";

                    if (response.weather && response.weather.length) {

                        status += "<p>";

                        if (response.weather[0].icon)
                            status += "<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='' /> ";

                        if (response.weather[0].description)
                            status += "<span>" + response.weather[0].description + "</span>";

                        status += "</p>";
                    }
                    if (response.main &&
                        response.main.temp)
                            status += "<p>" + response.main.temp + "°C</p>";

                    if (date)
                        status += "<small>(aktualisiert: " + date + ")</small>";
                }

                container.html(status);
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