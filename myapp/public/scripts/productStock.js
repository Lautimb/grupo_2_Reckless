const addMoreButton = document.querySelector('#add-more-button')

addMoreButton.onclick = (e) => {
    const sizeColorForm = document.querySelector('.ul-upload-data')
    const cln = sizeColorForm.cloneNode(true)
    document.querySelector('#div-upload-data').appendChild(cln);
}