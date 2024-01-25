$(document).ready(function () {
    $('#managementTabs a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});

const ham_icon = document.getElementById('ham_icon');
const side_bar = document.querySelector('.sidebar');
const content1 = document.querySelector('.content');



ham_icon.addEventListener('click', function () {
if (side_bar.style.display === "none" || side_bar.style.display === "") {
side_bar.style.display = "block";
content1.style.display = "none";
} else {
side_bar.style.display = "none";
content1.style.display = "block";
}
});

function adjustHeader() {
const header = document.querySelector('.left_header');
const logo = document.querySelector('.header_logo');
const headerText = document.getElementById('l_header');

headerText.style.fontSize = window.innerWidth / 30 + 'px'; 

const maxLogoWidth = 200; 
const logoWidth = Math.min(window.innerWidth / 4, maxLogoWidth); 
logo.style.width = logoWidth + 'px';
header.style.marginLeft = window.innerWidth / 30 + 'px';

if (window.innerWidth > 600) {
content1.style.display = "block";
}
}
adjustHeader();
window.addEventListener('resize', adjustHeader);