function getMemberData(_id) {
    let id = _id;
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let oname = $('#oname').val();
    let money = $('#mem_money').val();

    let result = `id=${id}`;
    result += `&name=${lname + " " + fname + " " + oname }`;
    result += `&money=${money}`;

    return result;
}

function getAuctionOptions() {
    let date = $('#date').val();
    let time = $('#time').val();
    let sell = $('#sell').val();
    let max_sell = $('#max_sell').val();
    let pause = $('#pause').val();

    let result = `beginDate=${date}`;
    result += `&beginTime=${time}`;
    result += `&sellTimeout=${sell}`;
    result += `&maxSellTimeout=${max_sell}`;
    result += `&pauseTimeout=${pause}`;

    return result;
}

function getData(_id) {
    let id = _id;
    let url = $('#url').val();
    let name = $('#name').val();
    let description = $('#description').val();
    let author = $('#author').val();
    let start_price = $('#start_price').val();
    let min_step = $('#min_step').val();
    let max_step = $('#max_step').val();
    let involved = $('#involved').prop("checked");

    let result = `id=${id}`;
    result += `&url=${url}`;
    result += `&name=${name}`;
    result += `&description=${description}`;
    result += `&author=${author}`;
    result += `&start_price=${start_price}`;
    result += `&min_step=${min_step}`;
    result += `&max_step=${max_step}`;
    result += `&involved=${involved}`;

    return result;
}

function save(next, id = new Date().getMilliseconds(), get = getData(id)) {
    console.log(id);
    $.ajax({
        type: "POST",
        crossDomain: true,
        data: get,
        success: function(json, status) {
            redirect(next);
        },
    })
}

function redirect(path) {
    window.location = window.location.origin + '/' + path;
}

function editMember(id, command) {
    console.log(id);
    let result = `id=${id}`;
    result += `&command=${command}`;
    $.ajax({
        url: "/members/edit",
        type: "POST",
        crossDomain: true,
        data: result,
        success: function(json, status) {
            window.location = window.location.origin + '/members';
        },
    })
}

function soldReq(id, member) {
    return new Promise(function (resolve, reject){
        let result = `id=${id}`;
        result += `&mem=${member}`;
        $.ajax({
            url: "/picture/sell",
            type: "POST",
            crossDomain: true,
            data: result,
            success: function(json, status) {
                resolve("ok")
            },
        })
    })
}
