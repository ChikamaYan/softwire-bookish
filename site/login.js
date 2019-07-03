function outputWelcome(username) {
    let el = document.getElementById("loginMessage");
    if (!username) {
        el.innerHTML = "Login failure!";
        return;
    }
    el.innerHTML = `Welcome! ${username} `;
}

function login() {
    let xhttp = new XMLHttpRequest();
    let username = document.getElementById('username').value;

    let password = document.getElementById('password').value;

    xhttp.open('GET', `http://localhost:3000/login/login?username=${encodeURI(username)}&password=${encodeURI(password)}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputWelcome(xhttp.responseText);
    };

    xhttp.send();
}

function checkLoginStatus() {
    let xhttp = new XMLHttpRequest();


    xhttp.open('GET', `http://localhost:3000/login/status`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputWelcome(xhttp.responseText === "Unauthorized" ? null : xhttp.responseText);
    };
    xhttp.send();
}

function searchTitle() {
    let xhttp = new XMLHttpRequest();
    let title = document.getElementById('title').value;

    xhttp.open('GET', `http://localhost:3000/book/searchByTitle?title=${encodeURI(title)}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputToHtml(xhttp.responseText);
    };


    xhttp.send();
}

function searchAuthor() {
    let xhttp = new XMLHttpRequest();
    let author = document.getElementById('author').value;

    xhttp.open('GET', `http://localhost:3000/book/searchByAuthor?author=${encodeURI(author)}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputToHtml(xhttp.responseText);
    };


    xhttp.send();
}

function borrowedBooks() {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/book/borrowedBook`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputToHtml(xhttp.responseText);
    };


    xhttp.send();
}

function allBooks() {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/book/allBook`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputToHtml(xhttp.responseText);
    };


    xhttp.send();
}

function outputToHtml(dataJSONString) {
    let data;
    let el = document.getElementById("result");
    try {
        data = JSON.parse(dataJSONString);
    } catch (e) {
        el.innerHTML = dataJSONString;
        return;
    }
    el.innerHTML = "";

    for (let b of data) {
        let subEl = createEltWithText("p", JSON.stringify(b))
        el.appendChild(subEl);
    }
}


function createEltWithText(tagname, text, onclick) {
    let el = document.createElement(tagname);
    el.appendChild(document.createTextNode(text));
    if (onclick) {
        el.addEventListener('click', onclick);
    }
    return el;
}