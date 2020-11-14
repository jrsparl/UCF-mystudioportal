// Sign up form handler
async function signupFormHandler(event) {
    event.preventDefault();

    // get the information from the sign up form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const first_name = document.querySelector('#first_name-signup').value.trim();
    const last_name = document.querySelector('#last_name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const role = document.querySelector("select[name='role-type']").value;

    // if all three fields have content
    if (username && email && first_name && last_name && role && password) {
        // POST the new user to the user table in the database
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // when the fetch promise is fufilled, check the response status and convey the results
        if (response.ok && response.user.role === "teacher") {
            document.location.replace('/teacherhome/');
        }
        if (response.ok && response.user.role === "student") {
            document.location.replace('/studenthome/');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);