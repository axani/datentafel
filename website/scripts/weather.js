function getWeatherConditionEntity(conditionId, isNight) {
    // Returns icon class name for common weather condition ids (openweathermap api)
    var entity = "&#x1F4FB;"; // radio as default (no service)
    conditionId = parseInt(conditionId);

    if (conditionId > 200 && conditionId < 800)
        // rain
        entity = "&#x2602;";
    else if (conditionId === 800)
        // clear sky / sun/moon
        if (isNight)
            // sun
            entity = "&#x1F319;";
        else
            // sun
            entity = "&#x2600;";
    else if (conditionId === 801)
        // partly cloudy
        entity = "&#x26C5;";
    else if (conditionId > 801 && conditionID < 900)
        // cloudy
        entity = "&#x2601;";

    return entity;
}


function isNight(sunrise, sunset) {
    var
        now = +(new Date()),
        sunrise = parseInt(sunrise*1000),
        sunset = parseInt(sunset*1000)
    ;

    if (now < sunrise ||
        now > sunset)
            return true;
    else
        return false;
}


function updateWeatherWidget() {
    // Calls openweathermap.org API and prints current wheather condition
    var
        appid = "",
        apiBase = "http://api.openweathermap.org/data/2.5/weather?q=",
        query = "Leipzig,de&units=metric&lang=de",


        requestUrl = apiBase + query, //+ "&appid=" + appid,

        container = $(".widget.weather")
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

            var entity;

            if (response.cod &&
                200 === response.cod) {

                    var isNightNow = false;

                    if (response.sys &&
                        response.sys.sunrise &&
                        response.sys.sunset) {

                        isNightNow = isNight(response.sys.sunrise, response.sys.sunset);
                    }

                    if (response.weather &&
                        response.weather.length &&
                        response.weather[0].id) {
                            // set icon corresponding to weather condition id
                            entity = getWeatherConditionEntity(response.weather[0].id, isNightNow);
                            container.find(".ss-icon").html(entity);
                    }


                    if (response.main &&
                        response.main.temp)
                            container.find(".temperature").html(response.main.temp + "° C");

            } else {
                // set default icon (no service)
                container.find(".ss-icon").html(getWeatherConditionEntity());
            }
        }
        console.log(response);
    });

    request.fail(function(jqXHR, textStatus) {
        // set default icon (no service)
        container.find(".ss-icon").html(getWeatherConditionEntity());
        console.log(jqXHR);
    });
}

$(function() {

    updateWeatherWidget();
    window.setInterval(updateWeatherWidget, 300000);
});