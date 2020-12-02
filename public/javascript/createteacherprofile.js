async function UserFormHandler(event) {
    event.preventDefault();

    const birthday = document.querySelector('#birthday-entry').value.trim();
    const coaching_genre = document.querySelector('#genre-entry').value.trim();
    const coaching_level = document.querySelector('#level-entry').value.trim();
    const user_id = document.getElementById('user_id-entry').textContent;
    const profile_pic = fileName;

    let dataObject;
    if (profile_pic) {
        dataObject = {
            //username,
            user_id,
            birthday,
            coaching_genre,
            coaching_level,
            profile_pic,
        }
    } else {
        dataObject = {
            //username,
            user_id,
            birthday,
            coaching_genre,
            coaching_level,
        }

    }

    if (birthday && coaching_genre && coaching_level && user_id) {
        const response = await fetch('/api/teachers/', {
            method: 'post',
            body: JSON.stringify(dataObject),
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