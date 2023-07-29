console.log("Welcome to Spotify");  //We have just added it to check 

//Initialize the Variables
let songIndex = 0;      // We have initialize the initial songIndex to be zero.
let audioElement = new Audio('song/1.mp3');       // we have called the function (i.e Audio) named as audioElement
let masterPlay = document.getElementById('masterPlay');        // we have called the 'masterPlay' by its 'ID' (masterplay is the middle play/pause button)
let myProgressBar = document.getElementById('myProgressBar');  // we have called the 'ProgressBar' by its 'ID' (ProgressBar is the moving line )
let gif=document.getElementById('gif');   //Calling the 'playinggif' image by its 'Id' 
let masterSongName = document.getElementById('masterSongName');  // we have made one variable masterSongName, and got the access by its 'Id' i.e 'masterSongName'.
let songItem=Array.from(document.getElementsByClassName('songItem'));  // calling the element by className'songItem'. as we need to call every songItem we have used Array.from



let song=[                                      //Creating an Array(song i.e name of an array) that will contains 'Arrays of object'
   {SongName:"Jug Jug Jeeve ~ Sachet Tandon", filepath:"song/1.mp3", CoverPath:"photo/1.jpg"}, //This conatins 'keyvaluepairs' i.e songname, filepath, coverpath
   {SongName:"Aam Jahe Munde ~ Parmish Verma", filepath:"song/2.mp3", CoverPath:"photo/2.jpg"}, 
   {SongName:"Ishare Tere Karti Nigah ~ Vatsala", filepath:"song/3.mp3", CoverPath:"photo/3.jpg"}, 
   {SongName:"Legend ~ Sidhu Moosewala", filepath:"song/4.mp3", CoverPath:"photo/4.jpg"}, 
   {SongName:"Selfmade ~ Sidhu Moosewala", filepath:"song/5.mp3", CoverPath:"photo/5.jpg"}, 
   {SongName:"Outlaw ~ Sidhu Moosewala", filepath:"song/6.mp3", CoverPath:"photo/6.jpg"},
   {SongName:"Never Fold ~ Sidhu Moosewala", filepath:"song/7.mp3", CoverPath:"photo/7.jpg"}, 
   {SongName:"Jatt Da Muqabala ~ Sidhu Moosewala", filepath:"song/8.mp3", CoverPath:"photo/8.jpg"} 

]

songItem.forEach((element, i) =>{
    element.getElementsByTagName("img")[0].src = song[i].CoverPath;
    element.getElementsByClassName("songName")[0].innerText = song[i].SongName;
})

//Handle Play/Pause Click
masterPlay.addEventListener('click', () => {      // In a masterPlay we have added event. If we click on masterPlay then a function i.e '()' will be called with some condition.
    if(audioElement.paused || audioElement.currentTime<=0){  // If audio present in audioElement is paused or audio is not started, then while clicking.
        audioElement.play();                                // while clicking audio will play.
        masterPlay.classList.remove("fa-play-circle");      // and there will be change in a classList of ID(masterclass). we will remove the play button icon.
        masterPlay.classList.add("fa-pause-circle");  // and there will be another change in a classList of ID(masterclass). we will add the pause button icon in place.
        gif.style.opacity = 1;   // we have to display the 'gif' when we play the music. so when we click then 'opacity' will become '1' and gif will start getting displayed.
    }
    else{                           
        audioElement.pause();    // same if music is playing we will pause it and then, ....
        masterPlay.classList.remove("fa-pause-circle");  // there will be another change in a classList of ID(masterclass). we will remove the pause button icon in place.
        masterPlay.classList.add("fa-play-circle");  //and there will be change in a classList of ID(masterclass). we will add the play button icon.
        gif.style.opacity = 0;  // we have to stop displaying the 'gif' when we pause the music. so when we click then 'opacity' will become '0' and gif will stop getting displayed.
    }
})



//*** Important lines go thoroughly
//Listen to Events
audioElement.addEventListener('timeupdate', () =>{  // In a 'audioElement' we add a event named as 'timeupdate'. here'()' this a way to call a function.
      // update in 'myProgressBar'
     let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);   // we have used parseInt to extract the number from a string. Here value of progress is in 'percentage' as (current time/Duration)*100 will give percentage.
      myProgressBar.value=progress;  // Then we add the value of 'progress' into the 'myProgressBar', so that it could change accodingly.
})


//*** Important lines go thoroughly
// 
myProgressBar.addEventListener('change', () =>{      // In A 'myProgressBar' we add a event with  name as 'change'.
    // Jab mai 'myProgressBar' change karengunga, toh audio bhi ussi se seek karke change karna chahiye.
    // audioElement.currentTime = myProgressBar.value; we haven't done this because myprogressbar value is in percentage now. so we need to change it to duration. 
     audioElement.currentTime = myProgressBar.value * audioElement.duration/100;   
})



// To make other play/pause button change accordingly when we click on play/pause. This is a code.
const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-pause-circle'); 
        element.classList.add('fa-play-circle');  
    })
}

//To make the play/pause(present in 'songItemPlay') button work while clicking on it i.e present in a songlist.. 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {   //we have called an elements by its 'classname' i.e songItemPlay.
    element.addEventListener('click', (e) =>{   // An 'event' is 'added' for an 'element' when we click on 'play/pause' button.
      if(audioElement.paused) {  // Agar audio paused hai toh. aur Tab hum click karenge toh.. yeh wala hoga.
       makeAllPlays();  // we called makeAllPlays function as written above.
       songIndex = parseInt(e.target.id);  // To get the Id from string we have used ParseInt. and stored it into songIndex i.e initial songIndex.
       e.target.classList.remove('fa-play-circle'); // when an element is clicked then play button will be removed....
       e.target.classList.add('fa-pause-circle');   // (continue)...and at a same time pause button will be added.
       audioElement.src = `song/${songIndex+1}.mp3`;   // It allows which song need to be played based on its Index.
       masterSongName.innerText = song[songIndex].SongName;
       audioElement.currentTime = 0;  // If we switch the new song then current time of audioElement should be zero.
       audioElement.play();      // Now we play the song
       gif.style.opacity=1;   // we will allow the access of gif
       masterPlay.classList.remove("fa-play-circle");    // if we click on present play button of inner box then it should be removed....
       masterPlay.classList.add("fa-pause-circle"); //....and pause button should be added instead .
    }
    else{ //Agar audio played hai toh. aur Tab hum click karenge toh.. yeh wala hoga.
        songIndex = parseInt(e.target.id);  // To get the Id from string we have used ParseInt. and stored it into songIndex i.e initial songIndex.
       e.target.classList.remove('fa-pause-circle'); // when an element is clicked then play button will be removed....
       e.target.classList.add('fa-play-circle');   // (continue)...and at a same time pause button will be added.
       audioElement.src = `song/${songIndex+1}.mp3`;   // It allows which song need to be played based on its Index.
       masterSongName.innerText = song[songIndex].SongName;
       audioElement.pause();      // Now we play the song
       gif.style.opacity=0;   // we will allow the access of gif
       masterPlay.classList.remove("fa-pause-circle");    // if we click on present play button of inner box then it should be removed....
       masterPlay.classList.add("fa-play-circle"); //....and pause button should be added instead .
    }
    })
})

document.getElementById('next').addEventListener('click', ()=>{   // using this we can take the access of right button.
         if(songIndex >= 9){
            songIndex = 0;
         }
         else{
            songIndex += 1;
         }
         audioElement.src = `song/${songIndex+1}.mp3`; 
         masterSongName.innerText = song[songIndex].SongName;
         audioElement.currentTime = 0;
         audioElement.play();
         gif.style.opacity=1;
         masterPlay.classList.remove("fa-play-circle");   
         masterPlay.classList.add("fa-pause-circle"); 
})

document.getElementById('previous').addEventListener('click', () =>{  // using this we can take the access of left button.
    if(songIndex <= 0){             // condition to chnage a song. if we click on left button and our index is at '0' then song of 'index 0' will play.
        songIndex = 0;    
    }
    else{
        songIndex -=1;   // condition to play a song. else if we click on previous then our index will change will -1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;   // we have given the audioElement to access the song. and same
    masterSongName.innerText = song[songIndex].SongName;  // we wanna display the SongName when music plays.
         audioElement.currentTime = 0;
         audioElement.play();
         gif.style.opacity=1;
         masterPlay.classList.remove("fa-play-circle");   
         masterPlay.classList.add("fa-pause-circle"); 
})