import * as PIXI from 'pixi.js';

export default class Obstacle extends PIXI.Sprite
{
    constructor(screen) 
    {
        super();
        this.type = 'enemy';
        this.screen = screen;
        this.texture = PIXI.Texture.fromImage('/img/obstacle.png');
        this.anchor.set(0.5);
        this.init();

        this.hitBox = {radius: this.width/2};
    }

    init()
    {
        //restart
        //random position, size and velocity. 
        //The initail position is on the right half of the screen so that it doesnt spaw on the aircraft.
        this.position.x = Math.random() * this.screen.width/2 + this.screen.width/2;
        this.position.y = Math.random() * this.screen.height * 3/4;
        this.width = Math.random() * 10 + 20; 
        this.height = this.width;
        this.velocityX = Math.random() + 1;
    }

    update(delta)
    {
        this.position.x -= this.velocityX * delta;
        this.rotation += 0.05 * delta;
        if(this.position.x < -200)
        {
            this.position.x = this.screen.width + 100
            this.position.y = Math.random() * this.screen.height *3/4;
        }
    }
}