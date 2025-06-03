document.addEventListener("DOMContentLoaded", function () {
    // Primero verificamos si los elementos existen
    const cookieConsent = document.getElementById("cookie-consent");
    const acceptCookiesButton = document.getElementById("accept-cookies");
    const rejectCookiesButton = document.getElementById("reject-cookies");
  
    // Solo procedemos si el elemento cookie-consent existe
    if (cookieConsent) {
        // Verificar si ya existe una cookie de consentimiento
        if (!getCookie("cookie_consent")) {
            cookieConsent.style.display = "flex";
        }

        // Verificar si existen los botones antes de agregar los listeners
        if (acceptCookiesButton) {
            acceptCookiesButton.addEventListener("click", function () {
                setCookie("cookie_consent", "accepted", 365);
                cookieConsent.style.display = "none";
            });
        }

        if (rejectCookiesButton) {
            rejectCookiesButton.addEventListener("click", function () {
                setCookie("cookie_consent", "rejected", 365);
                cookieConsent.style.display = "none";
            });
        }
    }
  
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
  
    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(";");
        
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length);
            }
        }
        return "";
    }
});


