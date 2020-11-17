async function FindMyStudentsHandler(event) {
  event.preventDefault();

  // const birthday = document.querySelector('#student-birthday-entry').value.trim();
  // const vocal_part_name = document.querySelector('#vocal_part-entry').value.trim();
  // const vocal_style = document.querySelector('#vocal_style-entry').value.trim();
  // const grade_level = document.querySelector('#grade_level-entry').value.trim();
  // const gender = document.querySelector('#gender-entry').value.trim();
  // const room_number = document.querySelector('#room_number-entry').value.trim();
  const teacher_id = document.getElementById("teacher-id-detail").textContent;

  if (teacher_id) {
    const response = await fetch("/api/students/" + teacher_id, {
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
        role = data.user.role;
        // if (role === "teacher") {
        //   document.location.replace("/teacherhome");
        // } else {
        //   document.location.replace("/studenthome");
        // }
      });
    } else {
        console.log("no")
      alert(response.statusText);
    }
  }
}

document
  .getElementById("get-students")
  .addEventListener("submit", FindMyStudentsHandler);
