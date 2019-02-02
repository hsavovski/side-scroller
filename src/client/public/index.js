import * as PIXI from 'pixi.js';
import Cloud from './sprites/Cloud';
import AirCraft from './sprites/Aircraft';
import Obstacle from './sprites/Obstacle';
import {ground, sky, distanceUI} from './sprites/Level';
import collide from 'triangle-circle-collision';
import Tank from './sprites/Tank';

var app = new PIXI.Application(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

let hero = new AirCraft(app.screen);
let tilingGround = ground(app.screen);

app.stage.addChild(sky(app.screen));
app.stage.addChild(tilingGround);
var cloudCount = 5;
for(var i=0; i<cloudCount;i++)
{
    app.stage.addChildAt(
        new Cloud(app.screen),
        2
    );
}
var obstacleCount = 5,
    obstacles = [];
for(var i=0; i<obstacleCount;i++)
{
    let obstacle = new Obstacle(app.screen);
    obstacles.push(obstacle);
    app.stage.addChild(obstacle);
}

var tankCount = 3,
    tanks = [];
for(var i=0; i<tankCount;i++)
{
    let tank = new Tank(app.screen, hero.position);
    tanks.push(tank);
    app.stage.addChild(tank);
}
app.stage.addChild(hero);
app.stage.addChild(
    distanceUI(
        tilingGround.tilePosition, 
        hero.position
    )
);

// Listen for animate update
app.ticker.add(function(delta) {
    app.stage.children.forEach(child => {
        if(child.update != null)
        {
            child.update(delta);
        
            //collision detection
            if(child.type == 'hero')
            {
                let hero = child;
                let vertices = hero.hitBox;
                
                app.stage.children.forEach(child => {        
                    if(child.type == 'enemy')
                    {
                        let triangle = [];
                        for(var i in vertices)
                        {
                            triangle.push([vertices[i].x,vertices[i].y])
                        }
                        let point = [child.position.x, child.position.y]
                        let radius = child.hitBox.radius;
                        if(collide(triangle, point, radius))
                        {
                            if(child.name == 'projectile')
                            {
                                child.destroy();
                            }
                            app.stage.children.forEach(el => {
                                if(el.init != null)
                                {
                                    el.init();
                                }
                            });
   
                            console.log("Collision");

                        }
                    }
                });
            }
        }
    });
});
