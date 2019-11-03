const accounts = [
    {
        username: "aa",
        password: "aa"
    },
    {
        username: "bb",
        password: "bb"
    }
]

function login() {
    let username = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let ok = false;
    accounts.forEach(e => {
        if (e.username === username && e.password===password)
            ok = true;
    })
    if (ok)
    {
        localStorage.ok = true;
        window.location = 'auction?auth=1';
    }
}
