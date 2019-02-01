import * as PIXI from 'pixi.js';

export default class Cloud extends PIXI.Sprite
{
    constructor(screen) 
    {
        super();
        this.screen = screen;
        this.texture = PIXI.Texture.fromImage('/img/cloud.png');
        this.position.x = Math.random() * screen.width;
        this.position.y = Math.random() * screen.height/2;
        this.width = Math.random() * 100 + 100 ; 
        this.height = this.width;
        this.velocity = Math.random() + 1;
    }

    update(delta)
    {
        this.position.x -= this.velocity * delta;
        if(this.position.x < -200)
        {
            this.position.x = this.screen.width + 100
            this.position.y = Math.random() * this.screen.height/2;
        }
    }
}