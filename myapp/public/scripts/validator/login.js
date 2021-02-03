const loginForm = document.querySelector("#login-form");
const loginButton = document.querySelector("#login-button");
const errorElement = document.querySelector(".errors");

loginButton.addEventListener("click", (e) => {

    const errors = [];
    errorElement.innerHTML = "";
    const email = document.querySelector("#login-email");
    const password = document.querySelector("#password-login");

    if(email.value.length == 0){
        errors.push("Your email is required.");
    }

    if(password.value.length == 0){
        errors.push("Your password is required.");
    }

    if(!errors.length){
        loginForm.submit()
    }
    for (error of errors){
        errorElement.innerHTML += `<li>${error}</li>`;
    }
})