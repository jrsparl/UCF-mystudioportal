let fileName = "";

document.querySelector("#upBtn").addEventListener("click", function () {
  const data = new FormData();
  data.append("fileUp", document.querySelector("#uploadInput").files[0]);

  fetch("/api/imgupload", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      this.textContent = "Success";
      response.json().then((result) => {
        console.log(result);
        console.log(result.data.name);
        fileName = result.data.name;
      });
    })
    .catch(() => {
      this.textContent = "Error";
    });
});
