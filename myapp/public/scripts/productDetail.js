const detailButton = document.querySelectorAll('.show-description')
const colorInput = document.querySelectorAll('.color-circle')

detailButton[0].onclick = (e) =>{
    const description = document.querySelector('#detail-description-text')
    description.classList.toggle('active')
    detailButton[0].classList.toggle('active')
    detailButton[1].classList.toggle('active')
}

detailButton[1].onclick = (e) =>{
    const description = document.querySelector('#detail-description-text')
    description.classList.toggle('active')
    detailButton[0].classList.toggle('active')
    detailButton[1].classList.toggle('active')   
 
}

colorInput.forEach( (input) => {
    input.onclick = (e) =>{
        input.classList.toggle('color-circle-border')
    }
})
