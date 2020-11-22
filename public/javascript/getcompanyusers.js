const companyTeachers = document.querySelector(".company-users")
async function FindCompanyUsers() {
  
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
        displayUser(data);
      });
    } else {
      console.log("no");
      alert(response.statusText);
    }
  }
}

var displayUser = function (userData) {
  

};



window.addEventListener("load", FindCompanyUsers);

// document.querySelector(".get-students").addEventListener("submit", FindMyStudentsHandler);
