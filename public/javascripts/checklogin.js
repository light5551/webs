let name = document.getElementById('welcome').innerText.split(', ')[1];
if (name !== localStorage.mainName)
    window.location = '/login'
