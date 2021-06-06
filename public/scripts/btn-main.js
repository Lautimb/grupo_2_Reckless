const btnMain = document.getElementById('btn-main')
const mainResponsive = document.querySelector('.main-responsive')
const wishlist = document.querySelector('.wishlist')
const wishlistHeart = document.querySelector('.wishlistHeart')
const language = document.querySelector('.language')
const flag = document.querySelector('.fa-flag')

btnMain.onclick = () => {
    language.classList.add('inactive')
    flag.classList.remove('inactive')
    wishlistHeart.classList.toggle('inactive')
    wishlist.classList.toggle('inactive')
    mainResponsive.classList.toggle('main-active')
    btnMain.classList.toggle('fa-bars')
    btnMain.classList.toggle('fa-times')

}
