const addMoreButton = document.querySelector('#add-more-button')
const clearButton = document.querySelector('.clear-button')
const sizeColorContainer = document.querySelector("#div-upload-data")

addMoreButton.onclick = (e) => {
    const newSizeColor = sizeColorContainer.lastElementChild
    const newCln = newSizeColor.cloneNode(true)
    let i = newCln.getAttribute("id")
    newCln.setAttribute("id", ++i)
    sizeColorContainer.appendChild(newCln);
}
