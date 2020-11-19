const vStudentBtn = document.getElementById("get-students");
const cardHolder = document.getElementById("student-card-holder");
async function FindMyStudentsHandler(event) {
  event.preventDefault();
  console.log("clicked");

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
        displayStudent(data);
      });
    } else {
      console.log("no");
      alert(response.statusText);
    }
  }
}

var displayStudent = function (studentData) {
  for (var i = 0; i < studentData.length; i++) {
    let firstName = studentData[i].user.first_name;
    let lastName = studentData[i].user.last_name;

    if (studentData[i].profile_pic) {
      var imgSource = "../files/" + studentData[i].profile_pic;
    } else {
      var imgSource = "../images/empty-profilepic.png";
    }
    //

    //build the student card
    let studentCardEl = document.createElement("article");
    studentCardEl.classList = "card col-3 bg-dark text-light m-2";
    cardHolder.appendChild(studentCardEl);

    //put content holder element in card
    let studentContentEL = document.createElement("div");
    studentContentEL.classList = "card-body";
    studentCardEl.appendChild(studentContentEL);

    //add image to card
    let StudentImg = document.createElement("img");
    // add a variable from the database response to get the correct src for the image
    StudentImg.setAttribute("src", imgSource);
    StudentImg.setAttribute("alt", "test image");
    StudentImg.classList = "card-img-top";
    studentContentEL.appendChild(StudentImg);

    //add name to card
    let studentNameEl = document.createElement("h4");
    studentNameEl.classList = "card-text";
    studentNameEl.textContent = firstName + " " + lastName;
    studentContentEL.appendChild(studentNameEl);
  }
};

vStudentBtn.addEventListener("click", FindMyStudentsHandler);

// document.querySelector(".get-students").addEventListener("submit", FindMyStudentsHandler);
