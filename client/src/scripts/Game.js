import Ball from './Ball.js';
import Paddle from './Paddle.js';
import { io } from 'socket.io-client';
let playerNumber = 0 ; 
let ready = false ;
let enemyReady = false ;
let curentPlayer = "user" ; 

var socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

// get your player's number
socket.on('player-number' , num => {
  if (num == -1) {
    document.getElementById("warning").innerHTML = "sorry the server is full"
    document.getElementById("start").disabled = true ; 

  }else {
    playerNumber = parseInt(num) ;
    if(playerNumber == 0 ){
      document.getElementById("warning").innerHTML = "you are the first player to join in"
      console.log(playerNumber) ;
    }else{
      document.getElementById("warning").innerHTML = "you are the second player to join in"
      curentPlayer = "enemy" ; 
      console.log(playerNumber) ;
    }
  }
}) ; 





// 



/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {
  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas ) {
    this.raf = null;
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(this ,  this.canvas.width - 780 , this.canvas.height/2 -50 , 0) ; 
    this.paddle2 = new Paddle (this , this.canvas.width - 45  , this.canvas.height / 2 - 50 , 0 )
  }




  /** start this game animation */
  start(event) {
    this.animate(event); 
  }
     
  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }

  
  
  

  

 
  

  /** animate the game : move and draw */
  animate(event) {
    this.moveAndDraw(event);
    this.ball.collide(this.paddle);
    this.ball.collide2(this.paddle2);
    this.ball.collesionWall(this.paddle );
    this.ball.collesionWall2(this.paddle2 );
    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }



  /** move then draw the bouncing ball */
  moveAndDraw(event) {
    const ctxt = this.canvas.getContext("2d");
    ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw and move the ball
    this.ball.move();
    this.ball.draw(ctxt);
    this.paddle.draw(ctxt);
    this.paddle2.draw(ctxt) ; 
    this.paddle.drawScore(ctxt , this.paddle2.score , this.canvas.width/4 , this.canvas.height/5 , "BLACK");
    this.paddle2.drawScore(ctxt , this.paddle.score , 3*this.canvas.width/4 , this.canvas.height/5 , "BLACK");
    this.paddleMovement(event);  
    this.paddleMovement2(event) ; 
    
  
    
  
     
  };

    

 
   // move and draw the panddle 

  // move up and down  with keyup and key down 
  paddleMovement(event)
  {if (event.keyCode == 38 ) {
    this.paddle.jumpUp();
    console.log(event.keyCode);
  }else if ( event.keyCode == 40 ) {
    this.paddle.jumpDown();
    console.log(event.keyCode);
  }}

  // move up and down for paddle 2 wth "z" and "s"
  paddleMovement2(event)
  {if (event.keyCode == 90 ) {
    this.paddle2.jumpUp();
    console.log(event.keyCode);
  }else if ( event.keyCode == 83 ) {
    this.paddle2.jumpDown();
    console.log(event.keyCode);
  }}
  
  
 

 

  // reset the game 
  

      
}
