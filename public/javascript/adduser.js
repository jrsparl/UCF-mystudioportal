async function UserFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-entry').value.trim();
    const password = document.querySelector('#password-entry').value.trim();
    const username = document.querySelector('#username-entry').value.trim();
    const role = document.querySelector('#role-entry').value.trim();
    const first_name = document.querySelector('#first_name-entry').value.trim();
    const last_name = document.querySelector('#last_name-entry').value.trim();
    const company_id = document.getElementById('company_id-entry').textContent;
        


    if (email && password && role && first_name && last_name && company_id) {
        const response = await fetch('/api/users/', {
            method: 'post',
            body: JSON.stringify({
            username,
            email,
            role,
            first_name,
            last_name,
            password,
            company_id,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

       
        if (response.ok) {
           console.log('user entered')
           //document.location.replace('/teacherhome') //this is taking you right to the new users page
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.user_entry-form').addEventListener('submit', UserFormHandler);