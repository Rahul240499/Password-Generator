let characters = [];

const uppercaseChar = [
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
];

const lowercaseChar = [
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
];

const numberChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbolChar = [
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

let uppercaseCheckbox = document.getElementById("uppercase");
let lowercaseCheckbox = document.getElementById("lowercase");
let numbersCheckbox = document.getElementById("numbers");
let symbolsCheckbox = document.getElementById("symbols");

let checkboxPreference = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
};

function atLeastOneChecked() {
    let checkboxes = document.querySelectorAll('input[name="characterType"]');
    let isChecked = false;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            isChecked = true;
        }
    });

    if (isChecked) {
        return true;
    }

    return false;
}

// Knuth Shuffle Algorithm
function shuffleString(str) {
    let characterArr = str.split("");
    let n = characterArr.length;

    for (let i = n - 1; i >= 1; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [characterArr[i], characterArr[randomIndex]] = [
            characterArr[randomIndex],
            characterArr[i],
        ];
    }

    return characterArr.join("");
}

function shuffleArray(arr) {
    let n = arr.length;

    for (let i = n - 1; i >= 1; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }

    return arr;
}

function getRandomChar(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let randomChar = arr[randomIndex];

    return randomChar;
}

function checkPasswordLength() {
    let passwordLengthEl = document.getElementById("password-length");
    let passwordLength = parseInt(passwordLengthEl.value);

    return passwordLength;
}

function makePassword(requiredPasswordLength) {
    let passwd = "";

    let currentCheckboxPreference = {
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
    };

    if (uppercaseCheckbox.checked) {
        currentCheckboxPreference.uppercase = true;
        passwd += getRandomChar(uppercaseChar);
    }

    if (lowercaseCheckbox.checked) {
        currentCheckboxPreference.lowercase = true;
        passwd += getRandomChar(lowercaseChar);
    }

    if (numbersCheckbox.checked) {
        currentCheckboxPreference.numbers = true;
        passwd += getRandomChar(numberChar);
    }

    if (symbolsCheckbox.checked) {
        currentCheckboxPreference.symbols = true;
        passwd += getRandomChar(symbolChar);
    }

    if (
        currentCheckboxPreference.uppercase !== checkboxPreference.uppercase ||
        currentCheckboxPreference.lowercase !== checkboxPreference.lowercase ||
        currentCheckboxPreference.numbers !== checkboxPreference.numbers ||
        currentCheckboxPreference.symbols !== checkboxPreference.symbols
    ) {
        checkboxPreference = currentCheckboxPreference;
        characters = [];

        if (checkboxPreference.uppercase) {
            for (let i = 0; i < uppercaseChar.length; i++) {
                characters.push(uppercaseChar[i]);
            }
        }

        if (checkboxPreference.lowercase) {
            for (let i = 0; i < lowercaseChar.length; i++) {
                characters.push(lowercaseChar[i]);
            }
        }

        if (checkboxPreference.numbers) {
            for (let i = 0; i < numberChar.length; i++) {
                characters.push(numberChar[i]);
            }
        }

        if (checkboxPreference.symbols) {
            for (let i = 0; i < symbolChar.length; i++) {
                characters.push(symbolChar[i]);
            }
        }

        characters = shuffleArray(characters);
    }

    let remainingPasswordLength = requiredPasswordLength - passwd.length;

    for (let i = 1; i <= remainingPasswordLength; i++) {
        passwd += getRandomChar(characters);
    }

    passwd = shuffleString(passwd);

    return passwd;
}

generatePasswordButton.addEventListener("click", function () {
    if (atLeastOneChecked()) {
        let requiredPasswordLength = checkPasswordLength();
        if (isNaN(requiredPasswordLength) || requiredPasswordLength < 7) {
            warningEl.textContent =
                "Password Length should be minimum 7 characters long";
            password1El.textContent = "";
            password2El.textContent = "";
        } else if (requiredPasswordLength > 20) {
            warningEl.textContent =
                "Password Length should be maximum 20 characters long";
            password1El.textContent = "";
            password2El.textContent = "";
        } else {
            warningEl.textContent = "";

            let password1 = "";
            let password2 = "";

            password1 = makePassword(requiredPasswordLength);
            password2 = makePassword(requiredPasswordLength);

            password1El.textContent = password1;
            password2El.textContent = password2;
        }
    } else {
        warningEl.textContent =
            "At least select one of the character type for your password!";
    }
});

function isPasswordLengthOk(passwordLength) {
    if (
        isNaN(passwordLength) === false &&
        passwordLength >= 7 &&
        passwordLength <= 20
    ) {
        return true;
    }

    return false;
}

password1El.addEventListener("click", function () {
    let passwordLength = checkPasswordLength();

    if (isPasswordLengthOk(passwordLength)) {
        let generatedPassword = password1El.textContent;

        navigator.clipboard
            .writeText(generatedPassword)
            .then(function () {
                alert("Password1 Copied To Clipboard!!");
            })
            .catch(function (error) {
                console.error("Error copying text: ", error);
            });
    } else {
        password1El.classList.remove("text-to-copy");
    }
});

password2El.addEventListener("click", function () {
    let passwordLength = checkPasswordLength();

    if (isPasswordLengthOk(passwordLength)) {
        let generatedPassword = password2El.textContent;

        navigator.clipboard
            .writeText(generatedPassword)
            .then(function () {
                alert("Password2 Copied To Clipboard!!");
            })
            .catch(function (error) {
                console.error("Error copying text: ", error);
            });
    } else {
        password2El.classList.remove("text-to-copy");
    }
});
