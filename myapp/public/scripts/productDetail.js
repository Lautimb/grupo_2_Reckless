const detailButton = document.querySelectorAll('.show-description')
const colorInputDiv = document.querySelectorAll('.color-circle')


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

colorInputDiv.forEach( (input, i, array) => {
    input.onclick = (e) =>{
        array.forEach(otherInputs => {
            otherInputs.classList.remove('color-circle-border')
        })
        input.classList.add('color-circle-border')
    }
})
