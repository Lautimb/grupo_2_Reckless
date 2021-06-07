const detailButton = document.querySelectorAll('.show-description')
const colorInputDiv = document.querySelectorAll('.color-circle')
const colorTitle = document.querySelector('legend')
const productId = window.location.pathname.split('/').pop();
const productStock= [];
const URL_SV = location.href

window.onload = function () {
    fetch(`${URL_SV}api/products/${productId}`,{
        method: 'GET',
        body: JSON.stringify(),
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then((res)=> res.json())
        
        .then(data => {
            productStock.push(data.data.product.stocks);
            }
        )
}

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
        colorTitle.innerHTML = `COLOR: ${input.id}`;
    }
})


