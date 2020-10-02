$(function () {
    (function () {
        function setCookie(key, value, expiry) {
            var expires = new Date();
            var host = window.location.hostname
                .split(".")
                .reverse()
                .splice(0, 3)
                .reverse()
                .join(".");
            console.log(host);
            expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
            document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/;domain=${host}`;
        }
        window.setCookie = setCookie;

        function getCookie(key) {
            var keyValue = document.cookie.match(
                "(^|;) ?" + key + "=([^;]*)(;|$)"
            );
            return keyValue ? keyValue[2] : null;
        }
        window.getCookie = getCookie;

        function eraseCookie(key) {
            var keyValue = getCookie(key);
            console.log(keyValue);
            setCookie(key, keyValue, "-1");
        }
        window.eraseCookie = eraseCookie;
    })();
});
