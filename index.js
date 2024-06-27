const characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "~",
    "`",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "+",
    "=",
    "{",
    "[",
    "}",
    "]",
    ",",
    "|",
    ":",
    ";",
    "<",
    ">",
    ".",
    "?",
    "/",
];

let generatePasswordButton = document.getElementById("generate-password");
let password1El = document.querySelector("#password1");
let password2El = document.getElementById("password2");
let warningEl = document.querySelector(".warning");

function getRandomChar() {
    let randomIndex = Math.floor(Math.random() * characters.length);
    let randomChar = characters[randomIndex];

    return randomChar;
}

function checkPasswordLength() {
    let passwordLengthEl = document.getElementById("password-length");
    let passwordLength = parseInt(passwordLengthEl.value);

    return passwordLength;
}

generatePasswordButton.addEventListener("click", function () {
    let requiredPasswordLength = checkPasswordLength();
    if (isNaN(requiredPasswordLength) || requiredPasswordLength < 7) {
        warningEl.textContent =
            "Password Length should be minimum 7 characters long";
    } else if (requiredPasswordLength > 20) {
        warningEl.textContent =
            "Password Length should be maximum 20 characters long";
    } else {
        warningEl.textContent = "";

        let password1 = "";
        let password2 = "";

        for (let i = 1; i <= requiredPasswordLength; i++) {
            password1 += getRandomChar();
        }

        for (let i = 1; i <= requiredPasswordLength; i++) {
            password2 += getRandomChar();
        }

        password1El.textContent = password1;
        password2El.textContent = password2;
    }
});
