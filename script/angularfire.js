/************************************************************************************
*************************************************************************************
*********************** Create Firebase Connection **********************************
*************************************************************************************
*************************************************************************************/

var ticTacToeApp = angular.module('ticTacToeApp', ['firebase']); 
//declares firebase dependency and initializes app as the angular module


ticTacToeApp.controller("ticTacToeCtrl", function($scope, $firebase){


/************************************************************************************
******************* Create Board object within Firebase *****************************
*************************************************************************************/

// setup board reference in firebase. save Board in board object within firebase
var boardRef = new Firebase('tictactoesuperheroes.firebaseio.com/board');
	//create Angularfire reference to data
var boardSync = $firebase(boardRef);
    // download the data into a sorted array
	// all server changes are applied in realtime and call it in DOM  with $scope
$scope.board = boardSync.$asArray();

// If board is not loaded, generate it
	$scope.board.$loaded(function ()
	{
		if($scope.board.length == 0)
		{
			for(var i = 0; i < 9; i++)
			{
				//create new record within an array
				$scope.board.$add({playerMove: ""});
				$scope.board.$save(i);
			}
		}
// in this case, it changes the text contained in each 
// element in the board in the data base to blanks. If board exists, clear it out!
// through the $scope.board[i].playerMove='' part 
		else
		{
			for(var i = 0; i < 9; i++)
			{
				$scope.board[i].playerMove = "";
				//push local changes to Firebase
				$scope.board.$save(i);
			}
		}
	});



/************************************************************************************
******************* Create Turn Counter within Firebase *****************************
*************************************************************************************/

  // firebase Counter. Create counter object within Firebase.
  var countRef = new Firebase('tictactoesuperheroes.firebaseio.com/counter');
  // create an AngularFire reference to the data
  var countSync = $firebase(countRef);
  //download the data into a local object
  $scope.counter = countSync.$asArray();

	$scope.counter.$loaded(function() 
	{
		if ($scope.counter.length==0)
		{ 			
			//creates counter variable if it doesn't already exist. call with numMoves key
				$scope.counter.$add({numMoves: 0})
		}
		else
		{ 				
			//updates counter variable if it already exists in database
				$scope.counter[0].numMoves=0; // set first element in counter to 0
				$scope.counter.$save($scope.counter[0]); //saves first element in counter (which is 0)
		}
	});




/************************************************************************************
******************* Create Player object within Firebase *****************************
*************************************************************************************/

  // firebase Players. Create player object within Firebase.
  var playerRef = new Firebase('tictactoesuperheroes.firebaseio.com/players');
 // create an AngularFire reference to the data
  var playerSync = $firebase(playerRef);
 //download the data into a local object 
  $scope.players = playerSync.$asArray();

//Creates & Saves players to Firebase
  	$scope.players.$loaded(function()
  	{
		if($scope.players.length == 0)
		{
			$scope.players.$add({playerOne: false, playerTwo: true});
		}
		else
		{
			$scope.players[0].playerOne = false;
			$scope.players[0].playerTwo = true;
			$scope.players.$save(0);
		}

	});




  
/************************************************************************************
*************************************************************************************
*************************** Tic Tac Toe Game Logic **********************************
*************************************************************************************
*************************************************************************************/

	

/************************************************************************************
**************************** Tic Tac Toe Game Variables *****************************
*************************************************************************************/

$scope.winScenarios = 
[
['1','2','3'],
['4','5','6'],
['7','8','9'],
['1','4','7'],
['2','5','8'],
['3','6','9'],
['1','5','9'],
['3','5','7']
];


/************************************************************************************
**************************** For when User makes a Move *****************************
*************************************************************************************/

$scope.makeMove = function(idx)
{
 console.log($scope.counter[0].numMoves);
 console.log($scope.counter);   

			if ((($scope.counter[0].numMoves % 2) == 0) && ($scope.board[idx].playerMove!="X") && ($scope.board[idx].playerMove!="O")) 
			{
				$scope.board[idx].playerMove = "X";
				$scope.board.$save($scope.board[idx]);
				$scope.players[0].playerTwo = true;
				// $scope.checkForWinners(scope.board[idx].playerMove);
			}
			//If the number of moves when /2 has a remainder of not 0, put an O. Save to database.
			else if ((($scope.counter[0].numMoves % 2) != 0) && ($scope.board[idx].playerMove!="X") && ($scope.board[idx].playerMove!="O")) 
			{
				$scope.board[idx].playerMove = "O";
				$scope.board.$save($scope.board[idx]);
				$scope.players[0].playerOne = false;
			}
		//End of each turn, check for Wins. Add to number of moves. Save.	
		$scope.counter[0].numMoves++;
		console.log($scope.counter[0].numMoves);
		$scope.counter.$save[0];
		// $scope.checkForWinners(scope.board[idx].playerMove);

}

/************************************************************************************
************************************ Win Logic!!! ***********************************
*************************************************************************************/

/* Create two loops. First loop circling through winScenarios with a symbol representing either X or O.
Then check against array to see if array on board is equal to any of the winScenarios. If as the array,
boardArrary, with the argument, winScenarios, loops, based on the length value of winScenarios, 
and discovers that item 0, item 1 and item 2 are equal to symbol, execute the instructions*/

// function checkForWinners(piece) {
// 	// console.log("winScenarios length: " + $scope.winScenarios.length);
// 	// console.log("the player number is: " + piece);
//   for(var i = 0; i < $scope.winScenarios.length; i++) 
//   	{
// 	    if($scope.board[$scope.winScenarios[i][0]]==piece&&$scope.board[$scope.winScenarios[i][1]]==piece&&$scope.board[$scope.winScenarios[i][2]]==piece)
// 	    {
// 	    	// console.log("Position: " + $scope.winScenarios[i][i]);
// 	    	// console.log("The piece is: " + piece);
// 	      alert(piece + " Won!")
// 	      $scope.reset();
// 	        // if (piece == "X")
// 	        // {
// 	        //   $scope.player1_counter++;
// 	        //   $scope.document.getElementById("player1counter").innerHTML = player1_counter;
// 	        // }
// 	        // else 
// 	        //  {
// 	        //    $scope.player2_counter++;
// 	        //    $scope.document.getElementById("player2counter").innerHTML = player2_counter; 
// 	        //  } 
// 	  	}
//   	}
// }

/************************************************************************************
************************************ Tie Check! *************************************
*************************************************************************************/

// function tieCheck(){
//   var isTie = false;
//   for(var i=0; i<=$scope.board.length;i++)
//   {
//     if ($scope.board[i] == "")
//     {
//       isTie = true;
//       break;
//     }
//   }
//   if(isTie)
//   {
//     alert("It's a tie!");
//     reset();
//   }
// };



/************************************************************************************
************************************ Reset Button ***********************************
*************************************************************************************/



$scope.reset = function()
{
	location.reload();
}





});









