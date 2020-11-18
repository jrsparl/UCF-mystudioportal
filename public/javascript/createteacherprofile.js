async function UserFormHandler(event) {
    event.preventDefault();

    const birthday = document.querySelector('#birthday-entry').value.trim();
    const coaching_genre = document.querySelector('#genre-entry').value.trim();
    const coaching_level = document.querySelector('#level-entry').value.trim();
    const user_id = document.getElementById('user_id-entry').textContent;
    const profile_pic = document.querySelector('#uploadInput').files[0].name;



    if (birthday && coaching_genre && coaching_level && user_id) {
        const response = await fetch('/api/teachers/', {
            method: 'post',
            body: JSON.stringify({
                birthday,
                coaching_genre,
                coaching_level,
                user_id,
                profile_pic,
            }),
            headers: { 'Content-Type': 'application/json' }
        });


        if (response.ok) {
            console.log('teacher entered')
            document.location.replace('/teacherhome')
            // need something here to refresh session or something as once new user is created homepage still the same
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.teacher_entry-form').addEventListener('submit', UserFormHandler);