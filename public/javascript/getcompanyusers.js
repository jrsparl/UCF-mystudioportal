const companyTeachers = document.querySelector(".company-teachers")
async function FindCompanyTeachers() {
  
  const company_id = document.querySelector(".company-id").textContent;

  if (company_id) {
    const response = await fetch("/adminhome/" + company_id, {
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
        displayTeacher(data);
      });
    } else {
      console.log("no");
      alert(response.statusText);
    }
  }
}

var displayTeacher = function (teacherData) {
  for (var i = 0; i < teacherData.length; i++) {
    let firstName = teacherData[i].user.first_name;
    let lastName = teacherData[i].user.last_name;
    let teacherID = teacherData[i].id
    if (teacherData[i].profile_pic) {
      var imgSource = "../files/" + teacherData[i].profile_pic;
    } else {
      var imgSource = "../images/empty-profilepic.png";
    }
    //

    //build the teacher card
    let teacherCardEl = document.createElement("article");
    teacherCardEl.classList = "card col-3 bg-dark text-light m-2";
    cardHolder.appendChild(teacherCardEl);

    //put content holder element in card
    let teacherContentEL = document.createElement("div");
    teacherContentEL.classList = "company-teachers";
    //teacherContentEL.setAttribute("id", teacherID)
    teacherCardEl.appendChild(teacherContentEL);

    //add image to card
    // let TeacherImg = document.createElement("img");
    // // add a variable from the database response to get the correct src for the image
    // TeacherImg.setAttribute("src", imgSource);
    // TeacherImg.setAttribute("alt", "test image");
    // TeacherImg.classList = "card-img-top";
    // teacherContentEL.appendChild(TeacherImg);

    //add name to card
    let teacherNameEl = document.createElement("h4");
    teacherNameEl.classList = "card-text";
    teacherNameEl.textContent = firstName + " " + lastName;
    teacherContentEL.appendChild(teacherNameEl);

    
    let teacherButton = document.createElement("a")
    teacherButton.classList = "white-text btn btn-secondary lesson-button";
    teacherButton.setAttribute("href", "/teacherlessonroom/" + teacherID)
    teacherButton.textContent = "Lesson Room"
    teacherContentEL.appendChild(teacherButton)


  }
};



window.addEventListener("load", FindCompanyTeachers);

// document.querySelector(".get-students").addEventListener("submit", FindMyStudentsHandler);
