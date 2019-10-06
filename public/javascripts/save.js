function save(id) {
    console.log(id);
    $.ajax({
        type: "POST",
        crossDomain: true,
        data: getData(id),
        success: function(json, status) {
            window.location = window.location.origin + '/auction';
        },
    })

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