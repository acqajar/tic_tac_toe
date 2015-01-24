var imgSrcs = [
    "images/6packLego.jpg",
    "images/BatmanSuperman.jpg",
    "images/legoFrozen.jpg",
    "images/legoVaderWetFloor.jpg",
    "images/stormTrooperheadphones.jpg",
    "images/VaderBikeRide.jpg"
]   // array of URLs
var myImages = [], img;
var characterChoices = document.getElementById("selections");
console.log(characterChoices)



for(var i = 0; i < 7; ++i) 
{
    var newDiv = document.createElement("div");
    console.log(characterChoices)
    characterChoices.appendChild(newDiv);
    // newDiv.innerHTML = i;
    newDiv.className+="images";
    newDiv.style.backgroundImage="url(" + imgSrcs[i] + ")";
}
    