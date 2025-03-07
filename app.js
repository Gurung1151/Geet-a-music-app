console.log("Hello Everyone");

//Initializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay =  document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gifElement = document.getElementById('gif')

let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo- Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo- Huma Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Different heaven", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Hello", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Oh My God", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
]

songItems.forEach((element, i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

// audioElement.play();
// handle play/pause click

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gifElement.style.opacity = 1;
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gifElement.style.opacity = 0;
    }
})

// listen to Events

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate')
    //UPDATE SEEKBAR
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex > 4){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex < 0){
        songIndex = 4;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})