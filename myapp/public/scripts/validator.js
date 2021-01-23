const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector(".form-login-style");
const productForm = document.querySelector("#product-upload__form");
const errorElement = document.querySelector(".errors");


registerForm.addEventListener("submit", (event)=>{
    const errors = []
    errorElement.innerHTML = ""
    const name = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email")
    const password = document.querySelector("#password");
    const retype = document.querySelector("#retype");

    if(name.value.trim().length <= 2){
        errors.push("Your name must contain at least 2 characters.");
    }

    if(lastName.value.trim().length <= 2){
        errors.push("Your last name must contain at least 2 characters.");
    }

    if(email.value.length == 0){
        errors.push("Your email is required.")
    }

    if(password.value.length <= 8){
        errors.push("Your password is required and must contain at least 8 characters.")
    }

    if(retype.value != password.value){
        errors.push("These passwords aren't the same. Please retype the same password")
    }

    
    if(errors.length){
        for (error of errors){
            errorElement.innerHTML += `<li>${error}</li>`;
        }
    }

    event.preventDefault()
})


loginForm.addEventListener("submit", (event)=>{
    event.preventDefault()
})


productForm.addEventListener("submit", (event)=>{
     event.preventDefault()
})