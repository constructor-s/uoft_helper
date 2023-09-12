/// uoft_login_helper.js
function login() {
    if (document.getElementsByClassName("form-error").length > 0) {
        console.log("There is error on the login page.");
    } else if (document.getElementById("username") && document.getElementById("username").value != "" && document.getElementById("password") && document.getElementById("password").value != "") {
        console.log(`Logging in with username: ${document.getElementById("username").value}`);
        document.getElementsByClassName("btn-lg")[0].click();
    } else {
        console.log("Not logging in because username or password is empty.");
        loginIfAutocomplete();
    }
}
function loginIfAutocomplete() {
    // https://stackoverflow.com/questions/35049555/chrome-autofill-autocomplete-no-value-for-password
    // Check if the background color of the username and password fields are white using getComputedStyle.
    // If it is white, then the password field is not autofilled.
    // If it is not white, then the password field is autofilled.
    if (window.getComputedStyle(document.getElementById("username")).backgroundColor != "rgb(255, 255, 255)" && window.getComputedStyle(document.getElementById("password")).backgroundColor != "rgb(255, 255, 255)") {
        console.log("Autofill detected. Logging in.");
        login(false);
    } else {
        // Call this function later to check if the password field is autofilled.
        console.log("Autofill not detected. Checking again in 1 second.");
        setTimeout(loginIfAutocomplete, 1000);
    }
}
console.log("Injecting login to window.onload.")
window.addEventListener("load", login);
