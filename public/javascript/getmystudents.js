const vStudentBtn = document.getElementById("get-students");
const cardHolder = document.getElementById("student-card-holder");
async function FindMyStudentsHandler(event) {
    event.preventDefault();
    console.log("clicked");

    const teacher_id = document.getElementById("teacher-id-detail").textContent;

    if (teacher_id) {
        const response = await fetch("/api/teachers/students/" + teacher_id, {
            method: "get",

            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayStudent(data);
            });
        } else {
            console.log("no");
            alert(response.statusText);
        }
    }
}

var displayStudent = function(studentData) {
    cardHolder.textContent = ""
    for (var i = 0; i < studentData.length; i++) {
        let firstName = studentData[i].user.first_name;
        let lastName = studentData[i].user.last_name;
        let studentID = studentData[i].id
        if (studentData[i].profile_pic) {
            var imgSource = "../files/" + studentData[i].profile_pic;
        } else {
            var imgSource = "../images/empty-profilepic.png";
        }
        //

        //build the student card
        let studentCardEl = document.createElement("div");
        studentCardEl.classList = "card mb-3 bg-dark text-light m-2";
        studentCardEl.setAttribute("style", "max-width: 300px;");
        cardHolder.appendChild(studentCardEl);

        //put content holder element in card
        let studentContentEL = document.createElement("div");
        studentContentEL.classList = "row no-gutters";
        //studentContentEL.setAttribute("id", studentID)
        studentCardEl.appendChild(studentContentEL);

        let studentContent2EL = document.createElement("div");
        studentContent2EL.classList = "col-md-4";
        //studentContentEL.setAttribute("id", studentID)
        studentContentEL.appendChild(studentContent2EL);

        //add image to card
        let StudentImg = document.createElement("img");
        // add a variable from the database response to get the correct src for the image
        StudentImg.setAttribute("src", imgSource);
        StudentImg.setAttribute("alt", "test image");
        StudentImg.classList = "card-img";
        studentContent2EL.appendChild(StudentImg);

        //add name to card
        let studentDetailsEl = document.createElement("div");
        studentDetailsEl.classList = "col-md-8";
        studentContentEL.appendChild(studentDetailsEl);

        let studentBodyEl = document.createElement("div");
        studentBodyEl.classList = "card-body";
        studentDetailsEl.appendChild(studentBodyEl);

        let studentNameEl = document.createElement("h4");
        studentNameEl.classList = "card-title";
        studentNameEl.textContent = firstName + " " + lastName;
        studentBodyEl.appendChild(studentNameEl);

        // debugger
        let studentButton = document.createElement("a")
        studentButton.classList = "white-text btn btn-secondary lesson-button";
        studentButton.setAttribute("href", "/teacherlessonroom/" + studentID)
        studentButton.textContent = "Lesson Room"
        studentBodyEl.appendChild(studentButton)


    }
};



vStudentBtn.addEventListener("click", FindMyStudentsHandler);

// document.querySelector(".get-students").addEventListener("submit", FindMyStudentsHandler);