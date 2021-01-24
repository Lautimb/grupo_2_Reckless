const registerForm = document.querySelector("#register-form");
const registerButton = document.querySelector("#button-register");
const errorElement = document.querySelector(".errors");


registerButton.addEventListener("click", (event)=>{
    const errors = []
    errorElement.innerHTML = ""
    const name = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const retype = document.querySelector("#retype");
    const day = document.querySelector("#date-dd");
    const month = document.querySelector("#date-mm");
    const year = document.querySelector("#date-yyyy");
    const decimal=  /^(?=.{8,}$)(?=.?[a-z])(?=.?[A-Z])(?=.?[0-9])(?=.?\W).*$/;

    if(name.value.trim().length < 2){
        errors.push("Your name must contain at least 2 characters.");
    }

    if(lastName.value.trim().length < 2){
        errors.push("Your last name must contain at least 2 characters.");
    }

    if(email.value.length == 0){
        errors.push("Your email is required.");
    }

    if(password.value.length < 8 /*&& password.value.search(/[A-Z]/) == -1*/){
        errors.push("Your password is required and must contain at least 8 characters and must contain an upper case character and one o more numbers");
    }

    if(retype.value != password.value){
        errors.push("These passwords aren't the same. Please retype the same password");
    }

    if(day.value == "" || month.value == "" || year.value == ""){
        errors.push("Please complete your birthday");
    }

    if(!errors.length){
        registerForm.submit()
    }
    for (error of errors){
        errorElement.innerHTML += `<li>${error}</li>`;
    }
})

