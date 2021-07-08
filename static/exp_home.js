$(document).ready(function(){
    console.log('ready!');
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

const next_btn = document.querySelector(".next");
const prev_btn = document.querySelector('.previous');

next_btn.addEventListener("click", function(){
    location.href = "/quiz";
});
prev_btn.addEventListener("click", function(){
    location.href = "/learn";
});