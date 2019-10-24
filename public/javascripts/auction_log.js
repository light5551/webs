let socket;
$(function() {
    socket = io.connect();
    var messages = $("#news_tab");
    socket.on('add mess', function(data) {
        messages.append("<div class='alert alert-" + data.className + "'><b>" +data.owner + "</b>: " + data.mess + "</div>");
    });

});

function sale(offset)
{
    // need to remove hardcoded member to member, that suggests the bet price
    if(getWinner() === "-")
        return
    let res = soldReq(offset, getWinner())
    res.then(function() {        let msg = {mess:"sold to " + getWinner() ,owner: "LazyBOT", className: "success"};
            socket.emit('send mess', msg);
            console.log("picture sold");
            //updateInfo();
         })
}

