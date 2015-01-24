
var player = true;
var player1_counter=0;
var player2_counter=0;
var boardArray = ["","","","","","","","",""];
var tile = document.getElementsByClassName("tiles");
var winScenarios = [
  [0, 1, 2], // first row across
  [3, 4, 5], // second ""
  [6, 7, 8], // third ""
  [0, 3, 6], // first column down
  [1, 4, 7], // second ""
  [2, 5, 8], // third ""
  [0, 4, 8], // diagonal from left
  [6, 4, 2]  // diagonal from right
];

function Btnselect(btn){
  // var cellNum = parseInt(btn[3]); why 3?. parsing begins after 3 element
  var cellNum = btn;
  console.log(btn);
  if(player)  // First player
  {
    if (boardArray[cellNum] != "") //if tile on board is not blank, then return what is on tile 
    {
      return;
    }
    else 
    {
      // var cellNum = parseInt(btn[3]);//why does 3 work
      console.log(cellNum);
      tile[cellNum].value = "X";
      boardArray[cellNum] = "X"; 
      player = false; //switch to second player (2) after move
      checkForWinners(boardArray[cellNum]);
      tieCheck();
    }
  } 
  else {
    if (boardArray[cellNum] != "")
    {
      return;
    }
    else 
    {
      console.log("the board array cell number is: " + boardArray[cellNum]);
      // var cellNum = parseInt(btn[3]);//why does 3 work
      console.log(cellNum);
      tile[cellNum].value = "O";
      boardArray[cellNum] = "O";
      player = true; //switch back to first player
      checkForWinners(boardArray[cellNum]);
      tieCheck();
      // winner();
    }
  }
}


function checkForWinners(symbol){
  console.log("the player number is: " + (player ? "1" : "2"));
  for(var i = 0; i < winScenarios.length; i++){
    if(boardArray[winScenarios[i][0]]==symbol&&boardArray[winScenarios[i][1]]==symbol&&boardArray[winScenarios[i][2]]==symbol)
    {
      alert(symbol + " WON!");
      reset();
      if (symbol=="X") 
        {
          player1_counter++;
          document.getElementById("player1counter").innerHTML = player1_counter; 
        }
      else 
        {
        player2_counter++;
        document.getElementById("player2counter").innerHTML = player2_counter; 
        } 
    }
  }
};


function reset(){
  boardArray = ["","","","","","","","",""];
  for(var i =0;i<tile.length;i++){
    tile[i].value="";
  }
  player = true;
};



function tieCheck(){
  var isTie = true;
  for(var i=0; i<=boardArray.length;i++)
  {
    if (boardArray[i] == ""){
      isTie = false;
      break;
    }
  }
  if(isTie)
  {
    alert("It's a tie!");
    reset();
  }
};



