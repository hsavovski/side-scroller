import * as PIXI from 'pixi.js';

export function sky(screen)
{
    var canvas = document.createElement('canvas');
    canvas.width  = screen.width;
    canvas.height = screen.height;
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#85b1f7");
    gradient.addColorStop(1, "#dadfe8");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,screen.width,screen.height);

    var sky = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));

    sky.update = ()=>{
        
    }
    return sky;
}

export function ground(screen)
{
    
    var groundSprite = new PIXI.Texture.fromImage('/img/ground.png');
    var ground = new PIXI.extras.TilingSprite(
        groundSprite,
        screen.width,
        100
    )
    ground.position.y = screen.height - 100;
    ground.tileScale.set(0.08,0.08);
    ground.tilePosition.y = 100;
    ground.update = (delta)=>{
        ground.tilePosition.x -= 1 * delta;
    
    }

    return ground;
}
