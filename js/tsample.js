(function() {
  'use strict'

  var mode = 'hvh';
  var token = 'X';
  var gameState = [null, null, null, null, null, null, null, null, null];
  var gameSquares = document.querySelectorAll('td');
  var i;

  var isWinner = function(state, t) {
    var i;
    var winStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(i = 0; i < winStates.length; i++) {
      if(state[winStates[i][0]] === t && state[winStates[i][0]] === state[winStates[i][1]] 
         && state[winStates[i][1]] === state[winStates[i][2]]) {
        return true;
      }
    }

    return false;
  };

  var isDraw = function(state) {
    var i;
    // only ever called after isWinner, so we assume that there isn't a winner for brevity
    for(i = 0; i < state.length; i++) {
      if(state[i] === null) {
        // there are still spaces in play; not a draw
        return false;
      }
    }

    return true;

  };

  // handles toggling of the played token and making AI moves
  var getNextTurn = function() {
    token = token === 'X' ? 'O' : 'X';

    switch(mode) {
      case 'hvh':
        break;
      case 'hva':
        if(token === 'O') {
          makeAIPlay();
        }
        break;
      case 'avh':
        if(token === 'X') {
          makeAIPlay();
        }
        break;
    }
  };

  var reset = function() {
    var i;
    for(i = 0; i < gameState.length; i++) {
      gameState[i] = null;
      gameSquares[i].innerHTML = '';
    }

    token = 'X';

    if(mode === 'avh') {
      // AI goes first in avh mode
      makeAIPlay();
    }
  };

  var claimSquare = function(index, token) {
    if(gameState[index] !== null) {
      return false;
    }
    
    gameState[index] = token;
    gameSquares[index].innerHTML = token;

    // check if the new game state is over
    if(isWinner(gameState, 'X')) {
      alert('X has won!');
      reset();
      return;
    }

    if(isWinner(gameState, 'O')) {
      alert('O has won!');
      reset();
      return;
    }

    if(isDraw(gameState)) {
      alert('Cat\'s game. ~(=^‥^)');
      reset();
      return;
    }


    getNextTurn();
  };

  // evaluation function for minimax
  var evaluateState = function(state, player, opponent) {
    if(isWinner(state, player)) {
      return 1;
    }

    if(isWinner(state, opponent)) {
      return -1;
    }

    return 0;
  };

  var minimax = function(state, player, opponent) {
    if(isWinner(state, player) || isWinner(state, opponent) || isDraw(state)) {
      // leaf node
      return evaluateState(state, token, token === 'X' ? 'O' : 'X');
    }

    var scores = [];
    var i;

    for(i = 0; i < state.length; i++) {
      // enumerate and score all valid plays
      if(state[i] === null) {
        var newState = state.slice(0);
        newState[i] = player;
        var score = minimax(newState, opponent, player);
        scores.push(score);
      }
    }

    if(player === token) {
      // maximize for the AI's 'turn'
      var bestScore = -1;
      for(var i = 0; i < scores.length; i++) {
        if(scores[i] > bestScore) {
          bestScore = scores[i];
        }
      }
      return bestScore;
    }

    if(player !== token) {
      // minimize for the human's 'turn'
      var bestScore = 1;
      for(var i = 0; i < scores.length; i++) {
        if(scores[i] < bestScore) {
          bestScore = scores[i];
        }
      }
      return bestScore;
    }
  };

  var makeAIPlay = function() {
    var opponent = token === 'X' ? 'O' : 'X';
    var bestMove = {move: null, score: -1};
    var i;

    for(i = 0; i < gameState.length; i++) {
      // evaluate all possible top-level moves
      if(gameState[i] === null) {
        var newState = gameState.slice(0);
        newState[i] = token;
        var score = minimax(newState, opponent, token);
        if(score >= bestMove.score) {
          bestMove = {move: i, score: score}
        }

      }
    }
    claimSquare(bestMove.move, token);
  };

  // event listeners and handlers

  var makeHumanPlay = function(event) {
    claimSquare(parseInt(event.target.id[1]), token);
  };


  for(i = 0; i < gameSquares.length; i ++) {
    gameSquares[i].addEventListener('click', makeHumanPlay);
  }

  var onRadioButtonClick = function(e) {
    mode = e.target.value;
    reset();
  };

  var radioButtons = document.querySelectorAll('input[name="mode"]');
  for(i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', onRadioButtonClick);
  }
})();