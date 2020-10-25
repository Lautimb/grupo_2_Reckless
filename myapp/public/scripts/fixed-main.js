
function fixedMain(){

    let scrollTop = document.documentElement.scrollTop;
    
    
    let navBar2 = document.querySelector('#nav-bar2')
    let mainCart = document.querySelector('#main-cart')

   
        if( scrollTop > 179 ){
            navBar2.style.position = "fixed";
            navBar2.style.top = "0px";
            navBar2.style.backgroundColor = "white";
            navBar2.style.zIndex = "100";
            navBar2.style.borderBottom = "0.5px solid #ede6e0";
            mainCart.style.marginTop= "65px"
            
           
        } else{
           
            navBar2.style.borderBottom = "none";
            navBar2.style.position = "relative";
            navBar2.style.top = "auto";
            navBar2.style.backgroundColor = "transparent";
            mainCart.style.marginTop= "auto"
        }

}

window.addEventListener('scroll', fixedMain);