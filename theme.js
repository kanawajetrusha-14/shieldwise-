function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("shieldwise-theme", "dark");
    } else {
        localStorage.setItem("shieldwise-theme", "light");
    }
}


document.addEventListener("DOMContentLoaded", function () {

    const savedTheme =
        localStorage.getItem("shieldwise-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

});