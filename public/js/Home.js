const div1 = document.querySelectorAll('#main_nav_container div');
        const ul1 = document.querySelectorAll('ul');
for (let index = 0; index < div1.length; index++) {
    
    div1[index].addEventListener('mouseover', function () {
            ul1[index].style.maxHeight = '28rem'; 
        });

        div1[index].addEventListener('mouseout', function () {
            ul1[index].style.maxHeight = '0'; 
        });
}


var lastScrollTop = 0;

window.addEventListener("scroll", function() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        document.getElementById("secondary_nav").classList.add("secondary_nav_hidden");
        document.getElementById("Logo_Name").classList.add("collapsed");
        document.getElementById("main_nav").classList.add("collapsed");
    } else {
        document.getElementById("secondary_nav").classList.remove("secondary_nav_hidden");
        document.getElementById("Logo_Name").classList.remove("collapsed");
        document.getElementById("main_nav").classList.remove("collapsed");
        
    }

    
});

