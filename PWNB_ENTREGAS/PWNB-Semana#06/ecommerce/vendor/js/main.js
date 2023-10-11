let menuBars = document.querySelector(".menu-bars");
let menuLinks = document.querySelector(".menu-links");
let close = document.querySelector(".mark");

menuBars.onclick = function () {
    menuLinks.classList.add("open");
};

close.onclick = function () {
    menuLinks.classList.remove("open");
};