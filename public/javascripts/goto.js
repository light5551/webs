function goto(name, cash) {
    window.location = window.location.origin + '/person?name=' + name + "&cash=" + cash;
}

function start() {
    let socket = io.connect();
    socket.emit('send mess', {mess:"Аукцион начался", owner:"Admin", className:"success", time: 3000})
    socket.emit('start');
}