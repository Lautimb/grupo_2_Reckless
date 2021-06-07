const likes = document.querySelectorAll('.like')
const URL_SV = location.href

const urlAdd = `${URL_SV}/api/users/addWishlist`
const urlRemove = `${URL_SV}/api/users/removeWishlist`
const reqLogged = `${URL_SV}/api/users/log`

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
    

