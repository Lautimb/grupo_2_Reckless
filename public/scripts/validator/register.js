const registerForm = document.querySelector("#register-form");
const registerButton = document.querySelector("#button-register");
const errorElement = document.querySelector(".errors");
const usersList = [];


window.onload = function () {
    fetch('http://localhost:3300/api/users',{
        method: 'POST',
        body: JSON.stringify(),
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then((res)=> res.json())
        
        .then(function(users){
            const data = users.data.users;
            for (user of data) {
                usersList.push(user);
            }
        })
         
}

registerButton.addEventListener("click", (e)=>{
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
    const passwordRegex =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

    if(name.value.trim().length < 2){
        errors.push("Your name must contain at least 2 characters.");
    }

    if(lastName.value.trim().length < 2){
        errors.push("Your last name must contain at least 2 characters.");
    }

    if(email.value.length == 0){
        errors.push("Your email is required.");
    }
    
    for (user of usersList) {
        if(email.value == user.email){
            errors.push("E-mail not available, please select a different e-mail")
        }
    }

    if(!email.value.match(emailRegex)){
        errors.push("Your e-mail has an invalid format. Please enter the correct e-mail")
    }

    if(!password.value.match(passwordRegex)){
        errors.push("Your password is required and must contain at least 8 characters, an upper case and a number ");
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

