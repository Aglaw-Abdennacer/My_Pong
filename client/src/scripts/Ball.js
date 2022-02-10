import Mobile from './Mobile.js';
import Game from './Game.js';
import Paddle from './Paddle.js';


// default values for a Ball : image and shifts
const PADDLE_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;


/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, PADDLE_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
    this.paddle = new Paddle(theGame , 20 , 550)
  }


  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
      this.shiftY = - this.shiftY;    // rebond en haut ou en bas
    }
    else if (this.x <= 0 || this.x + this.width >= this.theGame.canvas.width ) {
      this.shiftX = - this.shiftX;    // rebond en gauche ou à droite
    }
    super.move();
  }

  // reset position ball and paddles 
  reset(){
    this.x  = this.theGame.canvas.width/2 ; 
    this.y = this.theGame.canvas.height/2 ; 
  
  }
  reset2(){
    this.x  = this.theGame.canvas.width/2 ; 
    this.y = this.theGame.canvas.height/2 ; 
    
  }

 
  // collide wall and ball for paddle 1 
  collesionWall(paddle ) {
    if(this.x == 0 ) {
      //super.stopMoving() ; 
      paddle.score += 1 ;   
      this.reset();
      super.revers3();
      console.log(paddle.score) 
    }      
  }

    // collide wall and ball for paddle 1 
    collesionWall2(paddle ) {
      if(this.x + this.width == this.theGame.canvas.width) {
       // super.stopMoving() ; 
        paddle.score += 1 ;    
        this.reset2();
        super.revers2();
        console.log(paddle.score);   
      }      
    }


  // collide ball and paddle1  
  
  collide (paddle ) {
    if ( this.x - 5 < paddle.x + 20 && this.y < paddle.y + paddle.height && this.y + this. height  > paddle.y    ) {
    this.revers3();
    }   
  }  

  // collide ball and paddle 2 
  collide2(paddle ) {
    if ( this.x + this.width -5 > paddle.x  && this.y  < paddle.y + paddle.height && this.y + this.height > paddle.y   ) {
    this.revers4();
    console.log(paddle.score); 
    }   
  }
  

}
