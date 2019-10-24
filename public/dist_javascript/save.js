"use strict";

function getMemberData(_id) {
  var id = _id;
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  var oname = $('#oname').val();
  var money = $('#mem_money').val();
  var result = "id=".concat(id);
  result += "&name=".concat(lname + " " + fname + " " + oname);
  result += "&money=".concat(money);
  return result;
}

function getAuctionOptions() {
  var date = $('#date').val();
  var time = $('#time').val();
  var sell = $('#sell').val();
  var max_sell = $('#max_sell').val();
  var pause = $('#pause').val();
  var result = "beginDate=".concat(date);
  result += "&beginTime=".concat(time);
  result += "&sellTimeout=".concat(sell);
  result += "&maxSellTimeout=".concat(max_sell);
  result += "&pauseTimeout=".concat(pause);
  return result;
}

function getData(_id) {
  var id = _id;
  var url = $('#url').val();
  var name = $('#name').val();
  var description = $('#description').val();
  var author = $('#author').val();
  var start_price = $('#start_price').val();
  var min_step = $('#min_step').val();
  var max_step = $('#max_step').val();
  var involved = $('#involved').prop("checked");
  var result = "id=".concat(id);
  result += "&url=".concat(url);
  result += "&name=".concat(name);
  result += "&description=".concat(description);
  result += "&author=".concat(author);
  result += "&start_price=".concat(start_price);
  result += "&min_step=".concat(min_step);
  result += "&max_step=".concat(max_step);
  result += "&involved=".concat(involved);
  return result;
}

function save(next) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getMilliseconds();
  var get = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getData(id);
  console.log(id);
  $.ajax({
    type: "POST",
    crossDomain: true,
    data: get,
    success: function success(json, status) {
      redirect(next);
    }
  });
}

function redirect(path) {
  window.location = window.location.origin + '/' + path;
}

function editMember(id, command) {
  console.log(id);
  var result = "id=".concat(id);
  result += "&command=".concat(command);
  $.ajax({
    url: "/members/edit",
    type: "POST",
    crossDomain: true,
    data: result,
    success: function success(json, status) {
      window.location = window.location.origin + '/members';
    }
  });
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
