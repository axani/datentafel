Date.prototype.getMonthName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'de';
    return Date.locale[lang].month_names[this.getMonth()];
};

Date.prototype.getMonthNameShort = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'de';
    return Date.locale[lang].month_names_short[this.getMonth()];
};

Date.prototype.getWeekDayName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'de';
    return Date.locale[lang].day_names[this.getDay()];
};

Date.prototype.getWeekDayNameShort = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'de';
    return Date.locale[lang].day_names_short[this.getDay()];
};



Date.locale = {
    de: {
        month_names: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        month_names_short: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    
        day_names: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        day_names_short: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    }
};


$(function() {

    setInterval(updateTime, 10000);

    // var minutesElm = $('.minutes');
    // var hoursElm = $('.hours');

    // var weekDayElm = $('.week-day');
    // var dayOfMonthElm = $('.day-of-month');
    // var monthElm = $('.month');

    var timeElm = $('.widget.datetime .time .text');
    var dateElm = $('.widget.datetime .date .text');

    updateTime();


    function updateTime() {

        var nowTime = new Date();


        var minutes = nowTime.getMinutes();
        var hours = nowTime.getHours();

        var timeText = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);


        var weekDay = nowTime.getWeekDayName();
        var dayOfMonth = nowTime.getDate();
        var month = nowTime.getMonthNameShort();

        var dateText = weekDay + ', ' + dayOfMonth + '. ' + month;


        timeElm.text(timeText);
        dateElm.text(dateText);

    }
});