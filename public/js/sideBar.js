
const hamIconButton=document.getElementById('hamburgerIcon');
hamIconButton.style.textAlign='left';
hamIconButton.style.marginLeft='10px';



hamIconButton.addEventListener('click',function(){
    

  
    main_nav_container.classList.toggle('collapsed');
    main_nav_container.classList.toggle('expanded');
    main_nav.classList.toggle('collapsed');
    main_nav.classList.toggle('expanded');

})
    
 
   
