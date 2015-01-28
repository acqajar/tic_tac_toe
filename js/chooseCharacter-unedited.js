var imgSrcs = [
    "images/6packLego.jpg",
    "images/BatmanSuperman.jpg",
    "images/legoFrozen.jpg",
    "images/legoVaderWetFloor.jpg",
    "images/stormTrooperheadphones.jpg",
    "images/VaderBikeRide.jpg"
]   // array of URLs
var characterChoices = document.getElementById("selections");



for(var i = 0; i < 7; ++i) 
{
    var newDiv = document.createElement("div");
    // console.log(characterChoices)
    characterChoices.appendChild(newDiv);
    newDiv.className+="images"; //creates class of newDiv just created called  "images"
    newDiv.style.backgroundImage="url(" + imgSrcs[i] + ")";
}
    

//onclick of a single image that user selects that image as user's interface

function avatarSelect() {

}



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