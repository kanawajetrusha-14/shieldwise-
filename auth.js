/* =====================================================
   SHIELDWISE AUTHENTICATION
   LocalStorage Based Demo Authentication
   ===================================================== */


/* GET USERS */

function getUsers() {

    return JSON.parse(
        localStorage.getItem("shieldwise-users")
    ) || [];
}


/* SAVE USERS */

function saveUsers(users) {

    localStorage.setItem(
        "shieldwise-users",
        JSON.stringify(users)
    );
}


/* =====================================================
   SIGN UP
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const signupForm =
        document.getElementById("signupForm");

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    document.getElementById("signupName")
                        .value.trim();

                const email =
                    document.getElementById("signupEmail")
                        .value.trim()
                        .toLowerCase();

                const password =
                    document.getElementById("signupPassword")
                        .value;

                const confirmPassword =
                    document.getElementById("confirmPassword")
                        .value;

                const message =
                    document.getElementById("signupMessage");


                /* PASSWORD CHECK */

                if (password.length < 6) {

                    showMessage(
                        message,
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    return;
                }


                /* CONFIRM PASSWORD */

                if (password !== confirmPassword) {

                    showMessage(
                        message,
                        "Passwords do not match.",
                        "error"
                    );

                    return;
                }


                /* GET USERS */

                const users = getUsers();


                /* CHECK EXISTING USER */

                const existingUser =
                    users.find(
                        user => user.email === email
                    );


                if (existingUser) {

                    showMessage(
                        message,
                        "An account with this email already exists.",
                        "error"
                    );

                    return;
                }


                /* CREATE USER */

                const newUser = {

                    id: Date.now(),

                    name: name,

                    email: email,

                    password: password,

                    scamsLearned: 0,

                    quizScore: 0,

                    checklistCompleted: 0,

                    level: "Beginner",

                    progress: 0,

                    createdAt:
                        new Date().toISOString()

                };


                users.push(newUser);

                saveUsers(users);


                showMessage(
                    message,
                    "Account created successfully! Redirecting...",
                    "success"
                );


                setTimeout(function () {

                    window.location.href =
                        "login.html";

                }, 1200);

            }
        );
    }


    /* =================================================
       LOGIN
       ================================================= */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const emailOrUsername =
                    document.getElementById("loginEmail")
                        .value.trim()
                        .toLowerCase();


                const password =
                    document.getElementById("loginPassword")
                        .value;


                const message =
                    document.getElementById("loginMessage");


                const users = getUsers();


                /* FIND USER */

                const user =
                    users.find(function (item) {

                        return (
                            item.email === emailOrUsername ||
                            item.name.toLowerCase() === emailOrUsername
                        );

                    });


                /* INVALID LOGIN */

                if (!user || user.password !== password) {

                    showMessage(
                        message,
                        "Invalid email/username or password.",
                        "error"
                    );

                    return;
                }


                /* SAVE CURRENT USER */

                localStorage.setItem(
                    "shieldwise-current-user",
                    JSON.stringify(user)
                );


                showMessage(
                    message,
                    "Login successful! Opening dashboard...",
                    "success"
                );


                setTimeout(function () {

                    window.location.href =
                        "pages/dashboard.html";

                }, 800);

            }
        );
    }

});


/* =====================================================
   PASSWORD VISIBILITY
   ===================================================== */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";

    }
}


/* =====================================================
   MESSAGE
   ===================================================== */

function showMessage(element, text, type) {

    if (!element) return;

    element.textContent = text;

    if (type === "success") {

        element.style.color = "#08a878";

    } else {

        element.style.color = "#e53935";

    }
}


/* =====================================================
   FORGOT PASSWORD
   ===================================================== */

function forgotPassword(event) {

    event.preventDefault();

    alert(
        "For this college project demo, password recovery can be connected to an email service later."
    );
}


/* =====================================================
   LOGOUT
   ===================================================== */

function logout() {

    localStorage.removeItem(
        "shieldwise-current-user"
    );

    window.location.href =
        "../login.html";
}