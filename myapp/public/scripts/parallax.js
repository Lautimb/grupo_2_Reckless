const parallax = document.querySelector('.parallax');
const header = document.querySelector('header');

header.style.position = "absolute";
header.style.width = "100%";

function scrollParallax(){
    let scrollTop = document.documentElement.scrollTop;
    parallax.style.transform = 'translateY(' + scrollTop * 0.7 + 'px)';
}

window.addEventListener('scroll', scrollParallax);