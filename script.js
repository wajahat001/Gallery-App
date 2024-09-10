console.log("Heli I am back")

async function getPhotos() {
    let a= await fetch("http://127.0.0.1:3002/photos/")
    let response= await a.text()
    let div =document.createElement("div")
    div.innerHTML=response
    console.log(div)
    let anchors = div.getElementsByTagName("a")
    
    let photos =[];
    
    for (let index = 0; index < anchors.length; index++) {
        const element = anchors[index];
        if(element.href.endsWith(".jpg") || element.href.endsWith(".mp4")){
            photos.push(element.href.split("/photos/")[1])
        }
    }
    return photos;
    
} 


async function main() {
    let photos=await getPhotos()
   
    let photoUl= document.querySelector(".body").getElementsByTagName("ul")[0]
    for(const photo of photos ){
        if(photo.endsWith(".jpg")){
        photoUl.innerHTML = photoUl.innerHTML+`  <li>
                <div class="name">
                    <a href="${photo}">
                <img src="/photos/${photo}" alt="${photo}"  style="max-width: 100px; max-height: 100px;">
            </a>
            
                </div>
            </li>`
        }
       
    }
    let photoUl2= document.querySelector(".body2").getElementsByTagName("ul")[0]
    for(const photo of photos ){
        if(photo.endsWith(".mp4")){
            photoUl2.innerHTML = photoUl2.innerHTML+`  <li>
            <div class="name">
                <a href="${photo}">
                <video controls src="/photos/${photo}" style="width: 150px; height: 150px;"></video>
        </a>
            </div>
        </li>`
        }
       
    }
    // let dis=document.querySelector(".diplayimg")
    // let display=Array.from(document.querySelector(".images").getElementsByTagName("li"))
    //     display.forEach(e=>{
    //         e.addEventListener("click",()=>{
    //             dis.innerHTML=dis.innerHTML+  `<img src="/photos/${photos}" alt="${photos}" style="max-width: 100px; max-height: 100px;"></img>`
                
    //         })
    //     })

}

main()

