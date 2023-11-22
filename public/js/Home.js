// -----------------------------Navbar---------------------------------

const div1 = document.querySelectorAll(".holder");
const ul1 = document.querySelectorAll("ul");

function setupEventListeners() {
  const divs = document.querySelectorAll(".holder");
  const uls = document.querySelectorAll(".nav_ul");
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  console.log(screenWidth);

  for (let index = 0; index < divs.length; index++) {
    if (screenWidth > 1182) {
      divs[index].addEventListener("mouseover", function () {
        uls[index].style.maxHeight = "300rem";
      });

      divs[index].addEventListener("mouseout", function () {
        
        uls[index].style.maxHeight = "0";
      });
    } else {
      let flag = 0;
      divs[index].addEventListener("click", function () {
        if (flag == 0) {
          uls[index].style.maxHeight = "300rem";
          flag = 1;
        } else {
          uls[index].style.maxHeight = "0rem";
          flag = 0;
        }
      });
    }
  }
}

setupEventListeners();

window.addEventListener("resize", setupEventListeners);

//--------------------------On Scroll Header---------------------------------

var lastScrollTop = 0;

window.addEventListener("scroll", function () {
  var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    document
      .getElementById("secondary_nav")
      .classList.add("secondary_nav_hidden");
    document.getElementById("Logo_Name").classList.add("collapsed");
    document.getElementById("main_nav").classList.add("coll");
  } else {
    document
      .getElementById("secondary_nav")
      .classList.remove("secondary_nav_hidden");
    document.getElementById("Logo_Name").classList.remove("collapsed");
    document.getElementById("main_nav").classList.remove("coll");
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
