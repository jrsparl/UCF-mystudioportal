const vStudentBtn = document.getElementById('get-students')

async function FindMyStudentsHandler(event) {
  
event.preventDefault();
  console.log('clicked')

  const teacher_id = document.getElementById("teacher-id-detail").textContent;

  if (teacher_id) {
    const response = await fetch("/api/teachers/students/" + teacher_id, {
      method: "get",
      // body: JSON.stringify({
      //     birthday,
      //     vocal_part_name,
      //     vocal_style,
      //     grade_level,
      //     gender,
      //     room_number,
      //     teacher_id,
      // }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      
      });
    } else {
        console.log("no")
      alert(response.statusText);
    }
  }
}

vStudentBtn.addEventListener("click", FindMyStudentsHandler);



// document.querySelector(".get-students").addEventListener("submit", FindMyStudentsHandler);
