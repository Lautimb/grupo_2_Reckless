const createForm = document.querySelector("#product-upload__form");
const createButton = document.querySelector("#create-button");
const errorElement = document.querySelector(".errors");



createButton.addEventListener("click", (event)=>{
    const images = document.querySelector("#file").files;
    const name = document.querySelector("#create-name");
    const description = document.querySelector("#description");
    const price = document.querySelector("#productPrice");
    const discount = document.querySelector("#productPromo");
    const errors = [];
    errorElement.innerHTML = ""
    const acceptedExt = ['jpg','webp','jpeg','png', 'gif'];

    if(images.length == 0){
        errors.push("Please select 6 photos of your product")
    }
    
    for(image of images){
        const ext = image.type.split("/").pop()
        console.log(ext)
        if(!acceptedExt.includes(ext)){
            errors.push("Invalid extension. You can only use .jpg, .webp, .jpeg, .png and .gif files.")
       }
    }
    
    if(name.value.trim().length < 5){
        errors.push("The name of your product is required and must have at least 5 characters")
    }

    if(description.value.trim().length < 20){
        errors.push("The description of your products is required and must have at least 20 characters")
    }

    if(price.value == ""){
        errors.push("Price must be greater than 0")
    }
    console.log()

    if(!(discount.value > 0 && discount.value < 100) && discount.value.length > 0){
        errors.push("Discount must be greater than 0 and lower than 100.")
    }
    
    for (error of errors){
        errorElement.innerHTML += `<li>${error}</li>`;
    }
    event.preventDefault()
})