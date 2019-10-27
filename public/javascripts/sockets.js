var min = 1;
var max = 6;
var random = 5

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

let winner = "-"
let _socket;
wasPicture = false
let wasTime = false;
let offset = 0;
$(function() {
    _socket = io.connect();
    var $form = $("#messForm"); // Форму сообщений
    var $name = $("#name"); // Поле с именем
    var $textarea = $("#message"); // Текстовое поле
    var $all_messages = $("#all_mess"); // Блок с сообщениями

    $form.submit(function(event) {
        event.preventDefault();
    });
    _socket.on('add mess', function(data) {
        if (!wasTime && parseInt(data.time))
        {
            console.log("parse: " + parseInt(data.time) + " str: " + data.time)
            updateTime(parseInt(data.time))
            wasTime = true
        }
        else
            if(parseInt(data.time))
                tmp = parseInt(data.time)

        $all_messages.append("<div class='alert alert-" + data.className + "'><b>" +data.owner + "</b>: " + data.mess + "</div>");
    });

    _socket.on('change picture', function (data) {
        if (wasPicture && document.getElementById('welcome').innerText.split(', ')[1] === getWinner())
        {
            sale(offset)
            console.log("sale CALLING! Winner: " + getWinner())
        }
        offset++;
        wasPicture = true
        $('#picture').attr("src",data.src);
        if( winner !== "-" )
        {
            let cd = parseInt(document.getElementById('cash').innerText.split(' ')[2]);
            document.getElementById('cash').innerText = "Запас денег: " +
                (cd - parseInt(document.getElementById("your_rate").innerText.split(" ")[2])) + " $";
        }
        document.getElementById('rate').innerText = "Ставка на торгах: " + 0 + " $"
        document.getElementById('your_rate').innerText = "Наша ставка: " + 0 +" $"
    })

    _socket.on("change_total", (data) => {
        console.log('AAAAAAAAAA ' + data.value)
        document.getElementById('rate').innerText = "Ставка на торгах: " + data.value + " $"
        if (data.value !== parseInt(document.getElementById("your_rate").innerText.split(" ")[2]))
        {
            winner = "-"
        }
    })
});

function updateTime(time) {
        r=document.getElementById('clock'),
            tmp=time;
        r.innerText = 0;
    setInterval(function(){
            var c=tmp--,m=(c/60)>>0,s=(c)+'';
            r.textContent=(s.length>1?'':'0')+s
            tmp!=0||(tmp=time);
            console.log(c)
            console.log(m)
        },1000);
}

let yourrate=0
function send(msg) {
    _socket.emit('send mess', msg);
}

function add100() {
    let p = document.getElementById('your_rate').innerText
    let rate = parseInt(p.split(' ')[2])
    console.log("RATE "+rate)
    let value = parseInt(rate) + 100
    if (value > parseInt(document.getElementById('cash').innerText.split(' ')[2]))
        return
    document.getElementById('your_rate').innerText = 0
    document.getElementById('your_rate').innerText = "Наша ставка: " + value +" $"
    let owner = window.location.search.split('?name=')[1].split("%")[0]
    send({mess:"+100$",owner: owner, className: alertClass});
    if (value > parseInt(document.getElementById('rate').innerText.split(' ')[3]))
    {
        let win = document.getElementById('welcome').innerText.split(', ')[1]
        winner = win
        updateTotal(value, win)
    }
}

function add500() {
    let p = document.getElementById('your_rate').innerText
    let rate = parseInt(p.split(' ')[2])
    console.log("RATE "+rate)

    let value = parseInt(rate) + 500
    if (value > parseInt(document.getElementById('cash').innerText.split(' ')[2]))
        return
    document.getElementById('your_rate').innerText = 0
    document.getElementById('your_rate').innerText = "Наша ставка: " + value +" $"
    let owner = window.location.search.split('?name=')[1].split("%")[0]
    send({mess:"+500$", owner: owner, className: alertClass});

    if (value > parseInt(document.getElementById('rate').innerText.split(' ')[3]))
    {
        let win = document.getElementById('welcome').innerText.split(', ')[1]
        winner = win
        updateTotal(value, win)
    }
}

function addAllIn() {
    let owner = window.location.search.split('?name=')[1].split("%")[0]
    send({mess:"-1", owner: owner, className: alertClass});
}

function updateTotal(value, win) {
    _socket.emit('change total', {value: value, winner: win});
}

function getWinner() {
    return winner
}