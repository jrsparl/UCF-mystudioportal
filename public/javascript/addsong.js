async function SongFormHandler(event) {
  event.preventDefault();

  const song_name = document.querySelector("#song-name").value.trim();
  const album_name = document.querySelector("#song-album").value.trim();
  const song_writer = document.querySelector("#song-artist").value.trim();
  const company_id = document.getElementById("company-id").textContent;
  const path = fileName;

  const response = await fetch("/api/teachers/song", {
    method: "post",
    body: JSON.stringify({
      song_name,
      album_name,
      song_writer,
      company_id,
      path,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("song added");
    document.location.replace("/teacherhome/addsong");
  } else {
    console.log("oh no");
    alert(response.statusText);
  }
}

document
  .querySelector(".audio-upload")
  .addEventListener("submit", SongFormHandler);
