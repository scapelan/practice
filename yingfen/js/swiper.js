var slideshow = document.querySelector(".slideshow");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
next.onclick = function () {
    next_pic();
}
prev.onclick = function () {
    prev_pic();
}
function next_pic () {
    var newLeft = parseInt(slideshow.style.left)-1200;
    slideshow.style.left = newLeft + "px";
}
function prev_pic () {
    var newLeft = parseInt(slideshow.style.left)+1200;
    slideshow.style.left = newLeft + "px";
}