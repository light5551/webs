let socket;
$(function() {
    socket = io.connect();
    var messages = $("#news_tab");
    socket.on('add mess', function(data) {
        messages.append("<div class='alert alert-" + data.className + "'><b>" +data.owner + "</b>: " + data.mess + "</div>");
    });

});

function sale()
{
    // need to remove hardcoded member to member, that suggests the bet price
    let res = soldReq(slideIndex-1, "popa")
    res.then(function() {        let msg = {mess:"dw" ,owner: "LazyBOT", className: "success"};
            socket.emit('send mess', msg);
            console.log("picture sold");
            updateInfo(); })
}