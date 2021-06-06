const likes = document.querySelectorAll('.like')

const urlAdd = 'http://localhost:3300/api/users/addWishlist'
const urlRemove = 'http://localhost:3300/api/users/removeWishlist'
const reqLogged = 'http://localhost:3300/api/users/log'
likes.forEach( like =>{ 
    like.onclick = () =>{
        fetch(reqLogged,{method: 'POST'})
            .then( res => res.json())
                .then( data =>  {
                    if( data.userLog == true){
                        like.classList.toggle('added')
                        if(like.classList.contains('added')){
                            fetch( urlAdd ,  {
                                method:'POST',             
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    productId: like.id
                                })
                            
                            })
                        }

                        if(!like.classList.contains('added')){
                            fetch( urlRemove ,  {
                                method:'POST',             
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    productId: like.id
                                })
                            
                            })
                        }    

                    } else {
                        const modalRequireLogin = document.querySelector('#modalRequireLogin')
                        modalRequireLogin.classList.remove('inactive')
                        modalRequireLogin.classList.add('modal-login')
                        
                    }                
                })        
    }
    
})
    

