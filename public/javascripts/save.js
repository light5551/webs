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

function getData(_id) {
    let id = _id;
    let url = $('#url').val();
    let name = $('#name').val();
    let description = $('#description').val();
    let author = $('#author').val();
    let start_price = $('#start_price').val();

    let result = `id=${id}`;
    result += `&url=${url}`;
    result += `&name=${name}`;
    result += `&description=${description}`;
    result += `&author=${author}`;
    result += `&start_price=${start_price}`;

    return result;
}

function save(next, id = new Date().getMilliseconds(), get = getData(id)) {
    console.log(id);
    $.ajax({
        type: "POST",
        crossDomain: true,
        data: get,
        success: function(json, status) {
            window.location = window.location.origin + '/' + next;
        },
    })
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
