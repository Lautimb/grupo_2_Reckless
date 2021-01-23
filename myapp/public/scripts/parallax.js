const header = document.querySelector('header');

header.style.position = "absolute";
header.style.width = "100%";
header.style.zIndex = "10"

window.addEventListener('scroll',() => {
    const parallax = document.querySelector('.parallax');
    let scrollTop = document.documentElement.scrollTop;
    parallax.style.transform = 'translateY(' + scrollTop * 0.7 + 'px)';
});