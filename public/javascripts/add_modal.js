let modal = document.querySelectorAll(".modal");
let trigger = document.querySelectorAll(".man_button");
let closeButton = document.querySelectorAll(".close-button");

function toggleModal() {
    modal[0].classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal[0]) {
        toggleModal();
    }
}

trigger[0].addEventListener("click", toggleModal);
closeButton[0].addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
