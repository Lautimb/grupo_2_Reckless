// CREAR METODOS EN LA API

// DETECTAR EL ICONO EN LA VISTA
// CAMBIAR DE COLOR AL CLICKEAR
// GUARDAR EL PRODUCTO EN LA DATABASE
//

const likes = document.querySelectorAll('.like')

likes.forEach( like =>{
    like.onclick = () =>{
        like.classList.toggle("added")
        if(like.classList.contains("added")){
            fetch(`http://localhost:3300/api/users/addWishlist/${like.id}`,{ method: 'POST' }) 
        }
    }
})

