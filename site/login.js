function login() {
    let xhttp = new XMLHttpRequest();
    let username = document.getElementById('username').value;

    let password = document.getElementById('password').value;

    xhttp.open('GET', `http://localhost:3000/login?username=${username}&password=${password}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        let token = xhttp.responseText;
        console.log(token);
        document.cookie = `${token}`;
        window.location.replace("http://localhost:3000/book");
    };

    xhttp.send();

}

