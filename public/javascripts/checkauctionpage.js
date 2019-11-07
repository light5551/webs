//start_auction
//add_btn
//members_btn
//sale

if (localStorage.mainName !== 'admin')
{
    document.getElementById('start_auction').disabled = true;
    document.getElementById('add_btn').disabled = true;
    document.getElementById('members_btn').disabled = true;
    document.getElementById('sale').disabled = true;
}
