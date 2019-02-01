import * as PIXI from 'pixi.js';

export default class Obstacle extends PIXI.Sprite
{
    constructor(screen, position, velocity) 
    {
        super();
        this.type = 'enemy';
        this.name = 'projectile';
        this.screen = screen;
        this.texture = PIXI.Texture.fromImage('/img/projectile.png');
        this.anchor.set(0.5);
        //random color projectiles
        let colors = [0x4286f4, 0xf44183, 0x7ff441, 0xf48e41, 0x32baaa]
        let rand = Math.floor(Math.random() * colors.length)
        this.tint = colors[rand];

        this.position.set(position.x,position.y);
        this.width = 30; 
        this.height = this.width;
        this.velocity = velocity;

        //circle hitbox
        this.hitBox = {radius: this.width/2};
    }

    update(delta)
    {
        this.position.x -= this.velocity.x * delta;
        this.position.y -= this.velocity.y * delta;
        //destroy when out of bounds
        this.rotation += 0.05 * delta;
        if( this.position.x < -1 * this.width || this.position.x > screen.width + this.width ||
            this.position.y < -1 * this.height || this.position.y > screen.height + this.height)
        {
            this.destroy();
        }
    }
}