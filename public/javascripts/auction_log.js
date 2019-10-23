let promise = new Promise(function(resolve, reject) {
    // эта функция выполнится автоматически, при вызове new Promise
    setTimeout(() => resolve("done"), 2000);
});

let socket;
$(function() {
    socket = io.connect();
    var messages = $("#news_tab");
    socket.on('add mess', function(data) {
        messages.append("<div class='alert alert-" + data.className + "'><b>" +data.owner + "</b>: " + data.mess + "</div>");
    });

});

function sale() {

}