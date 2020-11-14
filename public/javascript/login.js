async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok && response.role === "teacher") {
            document.location.replace('/teacherDashboard/');
        }
        if (response.ok && response.role === "student") {
            document.location.replace('/studentDashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);