const addMoreButton = document.querySelector('#add-more-button')
const sizeColorContainer = document.querySelector('#div-upload-data')
const deleteOptionButton = document.querySelector('#delete-option-button')

addMoreButton.onclick = (e) => {
    const newSizeColor = sizeColorContainer.lastElementChild
    const newCln = newSizeColor.cloneNode(true)
    let i = newCln.getAttribute("id")
    newCln.setAttribute("id", ++i)
    sizeColorContainer.appendChild(newCln);
}

deleteOptionButton.onclick = (e) => {
    const children = sizeColorContainer.children;
    for (child of children) {
        const inputCheckbox = child.children[0].children[0];
        if (inputCheckbox.checked === true && sizeColorContainer.childElementCount >= 2) {
            sizeColorContainer.removeChild(child);
        }
    }
}
