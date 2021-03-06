/**
 * A bare bones Sprite and sprite Group example.
 *
 * We move a lot of Ship sprites across the screen with varying speed. The sprites
 * rotate themselves randomly. The sprites bounce back from the bottom of the
 * screen.
 */

var gamejs = require('gamejs');

/**
 * The ship Sprite has a randomly rotated image und moves with random speed (upwards).
 */
var Ship = function(rect) {
   // call superconstructor
   Ship.superConstructor.apply(this, arguments);
   this.origImage = gamejs.image.load("images/ship.png");
   this.speed = 40 + (10 * Math.random());
   this.image = gamejs.transform.rotate(this.origImage, 50 + parseInt(90*Math.random()));
   this.rect = new gamejs.Rect(rect);
   return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Ship, gamejs.sprite.Sprite);
Ship.prototype.update = function(msDuration) {
   // moveIp = move in place
   this.rect.moveIp(0, this.speed * (msDuration/1000));
   if (this.rect.top > 600) {
      this.speed *= -1;
   } else if (this.rect.top < 0 ) {
      this.speed *= -1;
   }
};

function main() {
   // screen setup
   gamejs.display.setMode([800, 600]);
   gamejs.display.setCaption("Example Sprites");
   // create some ship sprites and put them in a group
   var ship = new Ship([100, 100]);
   var gShips = new gamejs.sprite.Group();
   for (var j=0;j<4;j++) {
      for (var i=0; i<25; i++) {
         gShips.add(new Ship([10 + i*20, j * 20]));
      }
   }
   // game loop
   var mainSurface = gamejs.display.getSurface();
   // msDuration = time since last tick() call
   var tick = function(msDuration) {
         mainSurface.fill("#FFFFFF");
         // update and draw the ships
         gShips.update(msDuration);
         gShips.draw(mainSurface);
   };
   gamejs.time.fpsCallback(tick, this, 20);
}

/**
 * M A I N
 */
gamejs.preload(['images/ship.png']);
gamejs.ready(main);
