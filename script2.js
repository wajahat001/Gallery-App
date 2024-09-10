console.log("Hello, I am back");

let currFolder;
let photos = [];

async function getPhotos(folder) {
    currFolder = folder;
    let response = await fetch(`http://127.0.0.1:3002/Albums/${folder}`);
    let text = await response.text();
    let div = document.createElement("div");
    div.innerHTML = text;
    let anchors = div.getElementsByTagName("a");

    photos = []; // Clear the photos array before populating

    for (let index = 0; index < anchors.length; index++) {
        const element = anchors[index];
        
        if (element.href && (element.href.endsWith(".jpg") || element.href.endsWith(".mp4"))) {
            let photoName = element.href.split(`/${folder}/`)[1];
            if (photoName !== "cover.jpg") { // Exclude cover photo
                photos.push(photoName); // Get the photo file name
            }
        }
    }
    console.log("Photos array:", photos); // Debug: Check the photos array
    return photos;
}

async function displayAlbum() {
    let response = await fetch("http://127.0.0.1:3002/Albums/");
    let text = await response.text();
    let div = document.createElement("div");
    div.innerHTML = text;
    let Album = document.querySelector(".albums2");
    let anchors = div.getElementsByTagName("a");
    let array = Array.from(anchors);

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.href.includes("/Albums/")) {
            let folder = element.href.split("/").slice(-2).join("/");
            let photoResponse = await fetch(`/Albums/${folder}/info.json`);
            let photoData = await photoResponse.json();
            Album.innerHTML += `<li class="li" data-folder="${folder}">
                <img width="148px" height="150px" src="/Albums/${folder}/cover.jpg" alt="">
                <p>${photoData.Title}</p>
                <p>${photoData.Description}</p>
            </li>`;
        }
    }

    // Add click event listener to album items
    Album.querySelectorAll('.li').forEach(item => {
        item.addEventListener('click', async function(event) {
            let folder = item.getAttribute('data-folder');
            console.log("Clicked folder:", folder); // Debug: Check the clicked folder
            await getPhotos(folder);
            displayPhotos();
        });
    });
}

function displayPhotos() {
    // Display images
    let photoUl = document.querySelector(".body ul");
    photoUl.innerHTML = ''; // Clear previous photos
    for (const photo of photos) {
        if (photo.endsWith(".jpg")) {
            photoUl.innerHTML += `<li>
                <div class="name">
                    <a href="/Albums/${currFolder}/${photo}">
                        <img src="/Albums/${currFolder}/${photo}" alt="${photo}" style="max-width: 100px; max-height: 100px;">
                    </a>
                </div>
            </li>`;
        }
    }

    // Display videos
    let photoUl2 = document.querySelector(".body2 ul");
    photoUl2.innerHTML = ''; // Clear previous videos
    for (const photo of photos) {
        if (photo.endsWith(".mp4")) {
            photoUl2.innerHTML += `<li>
                <div class="name">
                    <a href="/Albums/${currFolder}/${photo}">
                        <video controls src="/Albums/${currFolder}/${photo}" style="width: 150px; height: 150px;"></video>
                    </a>
                </div>
            </li>`;
        }
    }
}

async function main() {
    await displayAlbum();
    // No need to initially load photos as it's now done on album click
}

main();
