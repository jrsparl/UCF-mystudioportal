async function StudentFormHandler(event) {
    event.preventDefault();

    const birthday = document.querySelector('#student-birthday-entry').value.trim();
    const vocal_part_name = document.querySelector('#vocal_part-entry').value.trim();
    const vocal_style = document.querySelector('#vocal_style-entry').value.trim();
    const grade_level = document.querySelector('#grade_level-entry').value.trim();
    const gender = document.querySelector('#gender-entry').value.trim();
    const room_number = document.querySelector('#room_number-entry').value.trim();
    const user_id = document.getElementById('student_user_id-entry').textContent;



    if (birthday && vocal_part_name && vocal_style && grade_level && room_number ) {
        const response = await fetch('/api/students/', {
            method: 'post',
            body: JSON.stringify({
                birthday,
                vocal_part_name,
                vocal_style,
                grade_level,
                gender,
                room_number,
                user_id,
            }),
            headers: { 'Content-Type': 'application/json' }
        });


        if (response.ok) {
            console.log('student entered')
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.student_entry-form').addEventListener('submit', StudentFormHandler);