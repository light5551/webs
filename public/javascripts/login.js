const accounts = [
    {
        username: "glazunov",
        password: "1"
    },
    {
        username: "admin",
        password: "1"
    },
    {
        username: "gosudarkin",
        password: "1"
    },
    {
        username: "tokarev",
        password: "1"
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
        localStorage.mainName = username;
        localStorage.ok = true;
        window.location = 'auction?auth=1';
    }
}
