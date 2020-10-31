let parallax = document.querySelector('.parallax');

function scrollParallax(){
    let scrollTop = document.documentElement.scrollTop;
    parallax.style.transform = 'translateY(' + scrollTop * 0.7 + 'px)';
}


window.addEventListener('scroll', scrollParallax);