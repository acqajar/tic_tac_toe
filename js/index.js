var xAvatar,oAvatar;
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

function Btnselect(btn)
{
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
      tile[cellNum].value = "X"; //place "X" symbol on board. Need .src to reference an image attribute
      boardArray[cellNum] = "X"; //place symbol into array
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
      console.log(cellNum);
      tile[cellNum].value = "O";//place "O" symbol on board
      boardArray[cellNum] = "O";//place "O" symbol on board
      player = true; //switch back to first player
      checkForWinners(boardArray[cellNum]);
      tieCheck();
      // winner();
    }
  }
}

/* Create two loops. First loop circling through winScenarios with a symbol representing either X or O.
Then check against array to see if array on board is equal to any of the winScenarios. If as the array,
boardArrary, with the argument, winScenarios, loops, based on the length value of winScenarios, 
and discovers that item 0, item 1 and item 2 are equal to symbol, execute the instructions*/
function checkForWinners(symbol)
{
  console.log("the player number is: " + (player ? "1" : "2"));
  for(var i = 0; i < winScenarios.length; i++)
  {
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
  boardArray = ["","","","","","","","",""]; //empty array
  for(var i =0;i<tile.length;i++){
    tile[i].value="";
  }
  player = true;
};



function tieCheck(){
  var isTie = true;
  for(var i=0; i<=boardArray.length;i++)
  {
    if (boardArray[i] == "")
    {
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


//Once tile/btn is selected, show a randomly generated math problem. If problem is answered correctly, allow tile to receive symbol
function mathCheck(){


}













