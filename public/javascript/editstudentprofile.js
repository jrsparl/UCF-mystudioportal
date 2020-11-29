async function EditStudentFormHandler(event) {
  event.preventDefault();

  const birthday = document
    .querySelector("#student-birthday-edit")
    .value.trim();
  const vocal_part_name = document
    .querySelector("#vocal_part-edit")
    .value.trim();
  const vocal_style = document.querySelector("#vocal_style-edit").value.trim();
  const grade_level = document.querySelector("#grade_level-edit").value.trim();
  const gender = document.querySelector("#gender-edit").value.trim();
  const room_number = document.querySelector("#room_number-edit").textContent;
  const student_id = document.getElementById("student_id-edit").textContent;
  const teacher_id = document.querySelector("#teacher_id-edit").textContent;
  const profile_pic = fileName;

  let dataObject;
  if (profile_pic) {
    dataObject = {
      //username,
      birthday,
      vocal_part_name,
      vocal_style,
      grade_level,
      gender,
      profile_pic,
    };
  } else {
    dataObject = {
      //username,
      birthday,
      vocal_part_name,
      vocal_style,
      grade_level,
      gender,
    };
  }

  if (
    birthday &&
    vocal_part_name &&
    vocal_style &&
    grade_level &&
    room_number &&
    student_id
  ) {
    const response = await fetch("/api/students/" + student_id, {
      method: "put",
      body: JSON.stringify(dataObject),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("student entered");
      document.location.replace("/studenthome/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".student_edit-form")
  .addEventListener("submit", EditStudentFormHandler);
