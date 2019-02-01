
export default class Aircraft extends PIXI.Sprite
{
    constructor(screen){
        super();
        this.screen = screen;
        this.type = 'hero';
        this.texture = new PIXI.Texture.fromImage('/img/aircraft.png');
        this.anchor.set(0.5);
        this.width = 100;
        this.height = 100;
        this.position.x = screen.width/4;
        this.position.y = screen.height/2;
        this.velocity = {x:0, y:0};
        this.friction = 0.97;
        this.acceleration = {x:0, y:0};
        this.keyCodes = {37: -1, 38: -1, 39: 1, 40: 1};
   
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }  

    init(x,y)
    {
        //restart
        this.position.x = x;
        this.position.y = y;
        this.velocity = {x:0,y:0};
        this.rotation = 0;
    }

    isInBounds(screen,position)
    {
        if( position.x < 0 || position.x > screen.width ||
            position.y < 0 || position.y > screen.height - 90)
       {
           return false;
       }
       return true;
    }

    onKeyDown(key){
        if (key.keyCode == 37 || key.keyCode == 39)
        {    
            this.acceleration.x = 0.4*this.keyCodes[key.keyCode];
        
            key.preventDefault();
        }
        else if (key.keyCode == 38 || key.keyCode == 40)
        {
           this.acceleration.y = 0.4*this.keyCodes[key.keyCode];

            key.preventDefault();
        }
    };
    onKeyUp(key){
        if (key.keyCode == 37 || key.keyCode == 39)
        {    
            this.acceleration.x = 0;

            key.preventDefault();
        }
        else if (key.keyCode == 38 || key.keyCode == 40)
        {
           this.acceleration.y = 0;

           key.preventDefault();
        }
    };

    update(delta)
    {
        //update velocity
        this.velocity.x += this.acceleration.x * delta;
        this.velocity.y += this.acceleration.y * delta;
        
        //update friction
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.rotation *= this.friction;
        //update position
        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;
        //rotate entity when we have vertical acceleration
        if(this.acceleration.y != 0)
        {         
            this.rotation += 0.01 * delta * Math.sign(this.acceleration.y);
        }
        //collision box, I used traingle because it fits the entity's shape
        this.hitBox = {
            vertice1: {
                x: this.position.x - this.width/2 + 6,
                y: this.position.y - 20
            },
            vertice2: {
                x: this.position.x - this.width/2 + 14,
                y: this.position.y + 6
            },
            vertice3: {
                x: this.position.x + this.width/2 - 6,
                y: this.position.y + 5
            }
        }  
        //stop entity when it get out of bounds
        if(!this.isInBounds(this.screen,this.position,this.width,this.height))
        {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

}