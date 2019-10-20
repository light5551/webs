var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
    updateInfo();
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slide");
    if (n > x.length) {
        slideIndex = 1;
    }
    if (n < 1) {slideIndex = x.length};
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}

function updateInfo(){
callAjaxGet(slideIndex - 1, changeInfo);
}

function callAjaxGet(id, callback) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200)
        {
            callback(this.responseText);
        };
    };
    req.open("GET",window.location.origin + '/picture/' + id + '?json', true);
    req.send();
}

function changeInfo(json) {
    let myJson = JSON.parse(json);
    let info =  document.getElementById('infoaboutpict');
    info.innerText = "Название: " + myJson.name + ", автор: " + myJson.author + " цена: " + myJson.start_price

}