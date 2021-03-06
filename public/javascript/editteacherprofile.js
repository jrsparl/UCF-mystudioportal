async function EditTeacherFormHandler(event) {
    event.preventDefault();

    const birthday = document.querySelector('#birthday-edit').value.trim();
    const coaching_genre = document.querySelector('#genre-edit').value.trim();
    const coaching_level = document.querySelector('#level-edit').value.trim();
    const teacher_id = document.getElementById('teacher_id-edit').textContent;
    const profile_pic = fileName;
    //const username = document.querySelector('#username-edit').value.trim();

    let dataObject;
    if(profile_pic) {
        dataObject = {
            //username,
            birthday,
            coaching_genre,
            coaching_level,
            profile_pic,
        } 
    } else {
        dataObject = {
            //username,
            birthday,
            coaching_genre,
            coaching_level,
        } 
        
    }

    if (birthday && coaching_genre && coaching_level && teacher_id) {
        const response = await fetch('/api/teachers/' + teacher_id, {
            method: 'put',
            body: JSON.stringify(dataObject),
            headers: { 'Content-Type': 'application/json' }
        });


        if (response.ok) {
            console.log('teacher edited')
            document.location.replace('/teacherhome/')
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.teacher_edit-form').addEventListener('submit', EditTeacherFormHandler);