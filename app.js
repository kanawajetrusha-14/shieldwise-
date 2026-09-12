console.log("ShieldWise application loaded successfully.");


// ===============================
// PWA SERVICE WORKER
// ===============================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(registration => {

                console.log(
                    "ShieldWise Service Worker registered:",
                    registration.scope
                );

            })
            .catch(error => {

                console.error(
                    "Service Worker registration failed:",
                    error
                );

            });

    });

}