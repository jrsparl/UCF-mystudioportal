document.querySelector("#upBtn").addEventListener("click", function () {
    const data = new FormData();
    data.append("fileUp", document.querySelector("#uploadInput").files[0]);
  
    fetch("/upload", {
      method: "POST",
      body: data
    })
      .then(() => {
        this.textContent = "Success";
      })
      .catch(() => {
        this.textContent = "Error";
      });
  });