var min = 1;
var max = 6;
var random = Math.floor(Math.random() * (max - min)) + min;

var alertClass;
switch (random) {
    case 1:
        alertClass = 'secondary';
        break;
    case 2:
        alertClass = 'danger';
        break;
    case 3:
        alertClass = 'success';
        break;
    case 4:
        alertClass = 'warning';
        break;
    case 5:
        alertClass = 'info';
        break;
    case 6:
        alertClass = 'light';
        break;
}

let socket;
$(function() {
    socket = io.connect();
    var $form = $("#messForm"); // Форму сообщений
    var $name = $("#name"); // Поле с именем
    var $textarea = $("#message"); // Текстовое поле
    var $all_messages = $("#all_mess"); // Блок с сообщениями

    $form.submit(function(event) {
        event.preventDefault();
    });
    socket.on('add mess', function(data) {
        $all_messages.append("<div class='alert alert-" + data.className + "'><b>" +data.owner + "</b>: " + data.mess + "</div>");
    });

    socket.on('change picture', function (data) {
        $('#picture').attr("src",data.src);
    })
});

function send(msg) {
    socket.emit('send mess', msg);
}

function add100() {
    let owner = window.location.search.split('?name=')[1].split("%")[0]
    send({mess:"+100$",owner: owner, className: alertClass});
}

function add500() {
    let owner = window.location.search.split('?name=')[1].split("%")[0]
    send({mess:"+500$", owner: owner, className: alertClass});
}

function addAllIn() {
    let owner = window.location.search.split('?name=')[1].split("%")[0]
    send({mess:"-1", owner: owner, className: alertClass});
}