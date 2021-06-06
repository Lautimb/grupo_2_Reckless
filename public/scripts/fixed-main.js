window.addEventListener('scroll',() => {

    let scrollTop = document.documentElement.scrollTop;
    let navBar2 = document.querySelector('#nav-bar2');
    let main = document.querySelector('main:not(.main-home)');
    let width = window.screen.width;
    navBar2.style.backgroundColor = "transparent";
    navBar2.style.borderBottom = "none";        
        if(scrollTop > 165 || width < 768){
            navBar2.style.position = "fixed";
            navBar2.style.top = "0px";
            navBar2.style.backgroundColor = "white";
            navBar2.style.zIndex = "100";
            navBar2.style.borderBottom = "0.5px solid #ede6e0";  
            if(main){
               main.style.marginTop= "55px"; 
            }  
        } else if(width > 768){
            navBar2.style.zIndex = "1";
            navBar2.style.borderBottom = "none";
            navBar2.style.position = "relative";
            navBar2.style.top = "auto";
            if(main){
                main.style.marginTop= "0";
            }     
        }
});