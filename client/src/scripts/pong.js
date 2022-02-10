"use strict";

import Game from "./Game.js";
import Paddle from "./Paddle.js";
import "../style/style.css";
const theField = document.getElementById("field");
const theGame = new Game(theField );


const init = () => {
  const theField = document.getElementById("field");
  const theGame = new Game(theField);
  const thePaddle = new Paddle(theGame , 20 , 550);

  document
    .getElementById("start")
    .addEventListener("click", (event) => startGame(theGame , event));
};

window.addEventListener("load", init );


//window.addEventListener("keyup"  , (e) => moveMeUp(theGame , e ) ); 




// true iff game is started
let started = false;
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 * @param {Paddle} thePaddle - the game to start and stop
 */

const startGame = (theGame , event) => {
  if (!started ) {
    theGame.start(event);
    window.addEventListener("keyup" , event => {
      theGame.paddleMovement(event) ; 
    }) 
    window.addEventListener("keyup" , event => {
      theGame.paddleMovement2(event) ; 
    }) 
    document.getElementById("start").value = "stop";
  } else  {
    document.getElementById("start").value = "jouer";
    theGame.stop();
  }
  started = !started;
};





  // final test
  




