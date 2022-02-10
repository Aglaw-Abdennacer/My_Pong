import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const Paddle_IMAGE_SRC = './images/paddle.png ';
//const SHIFT_X = 8;
const SHIFT_Y = 8;
const speed = 4 ;

export default class Paddle extends Mobile {

  /**  build a paddle
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this paddle belongs to
   * @param {number} score    the player's score 
   */
  constructor(theGame  , x ,y , score ) {
    super(x, y, Paddle_IMAGE_SRC ,0, SHIFT_Y );
    this.theGame = theGame ; 
    this.score = score ; 
  }

  // paddle movements 
    paddleMove(){
        if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
            this.shiftY = - this.shiftY;    // rebond en haut ou en bas
          }
          super.move();
    }

  //paddle move up AND down
        
        
  }

   

     


