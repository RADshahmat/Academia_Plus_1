// -----------------------------Navbar---------------------------------

const div1 = document.querySelectorAll('.holder');
        const ul1 = document.querySelectorAll('ul');
for (let index = 0; index < div1.length; index++) {
    
    div1[index].addEventListener('mouseover', function () {
            ul1[index].style.maxHeight = '35rem'; 
        });

        div1[index].addEventListener('mouseout', function () {
            ul1[index].style.maxHeight = '0'; 
        });
}


//--------------------------On Scroll Header---------------------------------

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

 //--------------------------interactive notice board--------------------------

const noticeList = document.querySelector(".notice-list");
const noticeItems = document.querySelectorAll(".notice-link");

noticeList.style.animation = "scroll 20s linear infinite";

noticeItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        noticeList.style.animationPlayState = "paused";
    });

    item.addEventListener("mouseleave", () => {
        noticeList.style.animationPlayState = "running";
     });
});

 // Handle click events on notices
noticeItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
         // Handle the click action here, e.g., open a link or perform an action
        alert(`You clicked on: ${item.textContent}`);
    });
});

//-------------------------------------------------------------------------------------