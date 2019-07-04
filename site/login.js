function login() {
    let xhttp = new XMLHttpRequest();
    let username = document.getElementById('username').value;

    let password = document.getElementById('password').value;

    xhttp.open('GET', `http://localhost:3000/login/login?username=${encodeURI(username)}&password=${encodeURI(password)}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        let username = xhttp.responseText;
        let el = document.getElementById("loginMessage");
        if (!username) {
            el.innerHTML = "Login failure!";
            return;
        }
        el.innerHTML = `Welcome! ${username} `;

    };

    xhttp.send();
}

function logout() {
    let el = document.getElementById("loginMessage");

    el.innerHTML = `Logged out!`;
    document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

function checkLoginStatus() {
    let xhttp = new XMLHttpRequest();


    xhttp.open('GET', `http://localhost:3000/login/status`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        let username = xhttp.responseText;
        let el = document.getElementById("loginMessage");
        if (!username || username === "Unauthorized") {
            el.innerHTML = "Not logged in";
            return;
        }
        el.innerHTML = `Welcome! ${username} `;
    };
    xhttp.send();
}

function searchTitle() {
    let xhttp = new XMLHttpRequest();
    let title = document.getElementById('searchTitle').value;

    xhttp.open('GET', `http://localhost:3000/book/searchByTitle?title=${encodeURI(title)}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputToHtml(xhttp.responseText);
    };


    xhttp.send();
}

function searchAuthor() {
    let xhttp = new XMLHttpRequest();
    let author = document.getElementById('searchAuthor').value;

    xhttp.open('GET', `http://localhost:3000/book/searchByAuthor?author=${encodeURI(author)}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputToHtml(xhttp.responseText);
    };


    xhttp.send();
}

function searchISBN() {
    let xhttp = new XMLHttpRequest();
    let isbn = document.getElementById('searchISBN').value;

    xhttp.open('GET', `http://localhost:3000/book/searchByISBN?isbn=${encodeURI(isbn)}`, true);
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

function addBook() {
    let xhttp = new XMLHttpRequest();

    let isbn = document.getElementById('addISBN').value;
    let title = document.getElementById('addTitle').value;
    let author = document.getElementById('addAuthor').value;
    let catalogue = document.getElementById('addCatalogue').value;

    xhttp.open('POST', `http://localhost:3000/book/addBook`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        outputToHtml(xhttp.responseText);
    };

    xhttp.send({
        isbn: isbn,
        title: title,
        author: author,
        catalogue: catalogue
    })
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
        let subEl = createEltWithText("p", JSON.stringify(b));
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