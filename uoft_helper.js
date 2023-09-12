/// uoft_login_helper.js
function login(retry = true) {
    if (document.getElementsByClassName("form-error").length > 0) {
        console.log("There is error on the login page.");
    } else if (document.getElementById("username") && document.getElementById("username").value != "" && document.getElementById("password") && document.getElementById("password").value != "") {
        console.log(`Logging in with username: ${document.getElementById("username").value}`);
        document.getElementsByClassName("btn-lg")[0].click();
    } else {
        console.log("Not logging in because username or password is empty.");
        if (retry) {
            console.log("Retrying in 1 second.");
            setTimeout(() => document.getElementsByClassName("btn-lg")[0].click(), 1000);
        }
    }
}
console.log("Injecting login to window.onload.")
window.addEventListener("load", login, true);
