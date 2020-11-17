async function EditTeacherFormHandler(event) {
    event.preventDefault();

    const birthday = document.querySelector('#birthday-edit').value.trim();
    const coaching_genre = document.querySelector('#genre-edit').value.trim();
    const coaching_level = document.querySelector('#level-edit').value.trim();
    const teacher_id = document.getElementById('teacher_id-edit').textContent;
    //const username = document.querySelector('#username-edit').value.trim();



    if (birthday && coaching_genre && coaching_level && teacher_id) {
        const response = await fetch('/api/teachers/' + teacher_id, {
            method: 'put',
            body: JSON.stringify({
                //username,
                birthday,
                coaching_genre,
                coaching_level,
            }),
            headers: { 'Content-Type': 'application/json' }
        });


        if (response.ok) {
            console.log('teacher edited')
            document.location.replace('/teacherhome/teacherprofile')
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.teacher_edit-form').addEventListener('submit', EditTeacherFormHandler);