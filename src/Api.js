import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:4201');
socket.on('RELOAD', ()=> {console.log('bad reload')})

function subscribeToTimer(update) {
    socket.on('RELOAD', () => {
        console.log('RELOAD');
        localStorage.updateSaledStockList = true;
        localStorage.updateStockList = true;
        localStorage.updateMemberList = true;
        update();
    });
    //socket.emit('some emit', 1000);
}
export { subscribeToTimer };
