async function UserFormHandler(event) {
    event.preventDefault();

    const songName = document.querySelector('#song-name').value.trim();
    const songAlbum = document.querySelector('#song-album').value.trim();
    const songArtist = document.querySelector('#song-artist').value.trim();
    const audioFile = fileName;

    let dataObject ={
        songName,
        songAlbum,
        songArtist,
        audioFile
    };
    

    if (birthday && coaching_genre && coaching_level && user_id) {
        const response = await fetch('/api/repertoire/', {
            method: 'post',
            body: JSON.stringify(dataObject),
            headers: { 'Content-Type': 'application/json' }
        });


        if (response.ok) {
            console.log('song added')
            document.location.replace('/addsong')
                
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.audio-upload').addEventListener('submit', UserFormHandler);