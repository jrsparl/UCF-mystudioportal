async function EditUserFormHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector("#first_name-edit").value.trim();
  const last_name = document.querySelector("#last_name-edit").value.trim();
  const email = document.querySelector("#email-edit").value.trim();
  const password = document.querySelector("#password-edit").value.trim();
  const user_id = document.getElementById("user_id-edit").textContent;
  //const passCheck = document.getElementById("passCheck")
  //const showPass = document.getElementById("showPass")

  

  let dataObject = {};
  if (first_name) dataObject.first_name = first_name;
  if (last_name) dataObject.last_name = last_name;
  if (email) dataObject.email = email;
  if (password) dataObject.password = password;
  if (user_id) dataObject.user_id = user_id;

  const response = await fetch("/api/users/" + user_id, {
    method: "put",
    body: JSON.stringify(dataObject),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("user edited");
    document.location.replace("./userprofile/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".user_edit-form")
  .addEventListener("submit", EditUserFormHandler);
