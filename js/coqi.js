

document.addEventListener("DOMContentLoaded", function () {
    const cookieConsent = document.getElementById("cookie-consent");
    const acceptCookiesButton = document.getElementById("accept-cookies");
    const rejectCookiesButton = document.getElementById("reject-cookies");
  
    // Verificar si ya existe una cookie de consentimiento
    if (!getCookie("cookie_consent")) {
      // Si no existe, mostrar el div
      cookieConsent.style.display = "flex";
    }
  
    // Manejar el clic en "Aceptar"
    acceptCookiesButton.addEventListener("click", function () {
      setCookie("cookie_consent", "accepted", 365); // Guardar la preferencia por 365 días
      cookieConsent.style.display = "none"; // Ocultar el div
    });
  
    // Manejar el clic en "Rechazar"
    rejectCookiesButton.addEventListener("click", function () {
      setCookie("cookie_consent", "rejected", 365); // Guardar la preferencia por 365 días
      cookieConsent.style.display = "none"; // Ocultar el div
    });
  
    // Función para establecer una cookie
    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
  
    // Función para obtener el valor de una cookie
    function getCookie(name) {
      const cookieName = name + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return "";
    }
  });


