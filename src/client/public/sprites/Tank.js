import * as PIXI from 'pixi.js';
import Projectile from './Projectile';

export default class Tank extends PIXI.Sprite
{
    constructor(screen, heroPos) 
    {
        super();
        this.heroPos = heroPos;
        this.type = 'enemy';
        this.screen = screen;
        this.texture = PIXI.Texture.fromImage('/img/tank.png');
        this.anchor.set(0.5)
        this.init();
        //circle hitbox
        this.hitBox = {radius: this.width/2 - 20};
        //the tank's gun is separated on another image so that 
        //it can be rotated according to target position
        let sprite = PIXI.Texture.fromImage('/img/tank-gun.png');
        let gun = new PIXI.Sprite.from(sprite);
        gun.name = 'gun';
        gun.anchor.set(0.9,0.5);
        gun.position.set(-110,-400);
        gun.update = (delta)=>{
            //distance vectors
            let vec1 = this.position.x - this.heroPos.x,
                vec2 = this.position.y - this.heroPos.y;
    
            let hypotenuse = Math.sqrt(vec1 * vec1 + vec2 * vec2);
            //calculate angle between tank and target
            let angle = Math.acos(vec1 / hypotenuse);
            
            gun.rotation = angle;
        }
        this.addChild(gun);
        //fire at intervals between 2 and 4 seconds
        setInterval(this.fire, Math.random() * 2000 + 2000, this, screen);
        
    }

    init()
    {
        this.position.x = Math.random() * this.screen.width;
        this.position.y = this.screen.height - 90;
        this.width = 100; 
        this.height = this.width;
        this.velocity = Math.random() + 1;
    }

    fire(tank, screen)
    {
        let gun = tank.children[0];

        let constant = 50;
        //distance vector we will use it for projectile velocity
        //the bigger the distance the faster the projectile
        //constant is for adjusting speed
        let velocity = {
            x: (tank.position.x - tank.heroPos.x)/constant,
            y: (tank.position.y - tank.heroPos.y)/constant
        };
        let projectile = new Projectile(screen, tank.position, velocity);
        tank.parent.addChild(projectile);

    }

    update(delta)
    {
        this.position.x -= this.velocity * delta;
        //reuse entity after its off screen
        if(this.position.x < -200)
        {
            this.position.x = this.screen.width + 100
        }
        //update child
        this.children[0].update(delta);

    }
}