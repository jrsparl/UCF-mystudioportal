async function EditStudentFormHandler(event) {
    event.preventDefault();

    const birthday = document.querySelector('#student-birthday-edit').value.trim();
    const vocal_part_name = document.querySelector('#vocal_part-edit').value.trim();
    const vocal_style = document.querySelector('#vocal_style-edit').value.trim();
    const grade_level = document.querySelector('#grade_level-edit').value.trim();
    const gender = document.querySelector('#gender-edit').value.trim();
    const room_number = document.querySelector('#room_number-edit').value.trim();
    const student_id = document.getElementById('student_id-edit').value.trim();
    const teacher_id = document.querySelector('#teacher_id-edit').value.trim();


    if (birthday && vocal_part_name && vocal_style && grade_level && room_number && student_id) {
        const response = await fetch('/api/students/' + student_id, {
            method: 'put',
            body: JSON.stringify({
                birthday,
                vocal_part_name,
                vocal_style,
                grade_level,
                gender,
                room_number,
                teacher_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });


        if (response.ok) {
            console.log('student entered')
            document.location.replace('/studenthome/')
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.student_edit-form').addEventListener('submit', EditStudentFormHandler);