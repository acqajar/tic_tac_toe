var imgSrcs = [
    "images/6packLego.jpg",
    "images/BatmanSuperman.jpg",
    "images/legoFrozen.jpg",
    "images/legoVaderWetFloor.jpg",
    "images/stormTrooperheadphones.jpg",
    "images/VaderBikeRide.jpg"
]   // array of URLs
var characterChoices = document.getElementById("selections");
var xTurn = true;
var imgborder = document.getElementsByClassName("avatar");
var xAvatar,oAvatar;
var imgs = document.getElementsByTagName('img');

 
// var imgborder = document.getElementById("avatar" + index);


// for(var i = 0; i < 7; ++i) 
// {
//     var newDiv = document.createElement("div");
//     // console.log(characterChoices)
//     characterChoices.appendChild(newDiv);
//     newDiv.className+="images"; //creates class of newDiv just created called  "images"
//     newDiv.style.backgroundImage="url(" + imgSrcs[i] + ")";
// }
    

//onclick of a single image that user selects that image as user's interface

   for (var i = 0; i < imgs.length; i++){

    // for(var i = 0; i < 7; ++i) 
    // {
    // var newDiv = document.createElement("div");
    // // console.log(characterChoices)
    // characterChoices.appendChild(newDiv);
           
           //attach event handler to each individual image 
            imgs[i].addEventListener('click', function () {


                 //store the url for this image being clicked
                 var imgSrc = this.getAttribute('src');
                              //below will set an images src 
                              //this.setAttribute('src',xAvatar);
                 
                 //check who's turn it is
                 if( xTurn )
                 {
                    //if it's x's turn, assign this avatar to them, and flip the turn
                    xAvatar = imgSrc;
                    this.style.border="20px solid red"; //this refers to the clicked image, xAvatar is the url and has no style attribute
                    xTurn = false;  
                 }
                 else
                 {

                    //else it's o's turn, so assign the avatar to o, and importantly: 
                    //at this stage both players have selected their avatars, so we can
                    //move to game play
                    oAvatar = imgSrc;
                    this.style.border="20px solid blue";

                 }

            })
   
   }

// avatar1.onclick = function(){
//     avatar1.style.border = "1px solid red";
// }



/* 1. Allow player1 to select avatar
2. allow user 2 to select
3. Write image to innerhtml
4. carry over and insert as value for player1 and player2 respectively

--------

function on div object that onclick selects div as user's avatar


Same
3. Save image in local storage
4. Need new function (button) to clear local storage and go back to startpage!!! 

*/
