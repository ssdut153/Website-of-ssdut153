(function () {
    var waitForBing = function () {
        setTimeout(function () {
            var btn = document.getElementById('WidgetCloseButton');
            if (btn == null) {
                waitForBing();
            } else {
                btn.click();
            }
        }, 10);
    };
    window.onload = function () {
        waitForBing();
    };
    window.onresize = function () {
        var text = document.getElementsByClassName('text')[0];
        if (window.getComputedStyle(text).display != 'none') {
            waitForBing();
        }
    };
})();