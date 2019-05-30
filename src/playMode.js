const { makeMode } = require('./mode');
const { randomRange } = require('./random');
const { clamp } = require('./util');
const Vec2 = require('./vec2');
const { renderBullets, renderConnectors, renderShip, renderBackground, renderStars } = require('./render');

function makeStars(width, height, n=100) {
    const starColors = ['yellow', 'white', 'lightblue'],
          stars = [];
    for (let i=0; i<n; ++i) {
        stars.push({
            pos: Vec2.random(0, width, 0, height),
            r: 1,
            color: starColors[randomRange(0, starColors.length-1)],
        });
    }
    return stars;
}

function makeBullet(bullets, pos, dir, vel=10) {
    bullets.push({
        pos: pos,
        dir: dir,
        len: 10,
        color: 'cyan',
        vel: vel,
    });
    return bullets;
}

function updateShip(ship) {
    ship.vel = clamp(ship.vel + ship.acc, -ship.maxVelForward, ship.maxVelBackward);
    ship.aVel = clamp(ship.aVel + ship.aAcc, -ship.maxAngularAcc, ship.maxAngularAcc);
    ship.dir += ship.aVel;

    const dir = ship.vel < 0 ? ship.dir : -Math.PI + ship.dir; // going backwards
    const vel = Vec2.fromAngleCorrect(dir).mulScalar(Math.abs(ship.vel));
    ship.pos = ship.pos.add(vel);
}

function updateBullets(bullets) {
    for (const bullet of bullets) {
        bullet.pos = bullet.dir.mulScalar(bullet.vel).add(bullet.pos);
    }
}

function update(game) {
    updateShip(game.ship);
    updateBullets(game.bullets);
}

function makeShipKeyUp (game) {
    return function (e) {
        const { ship } = game;
        switch (e.key) {
        case 'w':
        case 'ArrowUp':
            ship.acc = 0;
            break;
        case 'a':
        case'ArrowLeft':
            ship.aAcc = 0;
            break;
        case 's':
        case 'ArrowDown':
            ship.acc = 0;
            break;
        case 'd':
        case'ArrowRight':
            ship.aAcc = 0;
            break;
        }
    };
}

function makeShipKeyDown(game) {
    return function (e) {
        const { ship, bullets } = game;
        const thrust = 0.05;
        switch (e.key) {
        case 'w':
        case 'ArrowUp':
            ship.acc = -thrust;
            break;
        case 'a':
        case'ArrowLeft':
            var asdf = -Math.PI/1500;
            ship.aAcc = asdf * Math.abs(ship.vel/ship.maxVelForward);
            break;
        case 's':
        case 'ArrowDown':
            ship.acc = thrust;
            break;
        case 'd':
        case'ArrowRight':
            var asdf = Math.PI/1500;
            ship.aAcc = asdf * Math.abs(ship.vel/ship.maxVelForward);
            break;
        case ' ':
            const dir = Vec2.fromAngleCorrect(ship.dir);
            makeBullet(bullets, ship.pos, dir, 10);
            break;
        }
    };
}

makeMode('play', function (game) {
    game.stars = makeStars(game.canvas.width, game.canvas.height);
    game.bullets = [];
    game.ship = {
        pos: new Vec2(game.canvas.width/2, game.canvas.height/2),
        vel: 0,
        acc: 0, // a constant not a vector because the direction is determined by "dir"
        aVel: 0, // angular velocity
        aAcc: 0, // angular acceleration
        dir: 0,
        maxVelForward: 4,
        maxVelBackward: 1,
        maxAngularAcc: 0.03,
    };
    
    game.shipKeyUp = makeShipKeyUp(game);
    game.shipKeyDown = makeShipKeyDown(game);
    
    window.addEventListener('keyup', game.shipKeyUp);
    window.addEventListener('keydown', game.shipKeyDown);
}, function (game) {
    window.removeEventListener('keyup', game.shipKeyUp);
    window.removeEventListener('keydown', game.shipKeyDown);
    delete game.ship;
    delete game.stars;
    delete game.shipKeyUp;
    delete game.shipKeyDown;
}, function (game, dTime) {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    update(game);
    renderBackground(game.ctx, game.canvas.width, game.canvas.height);
    renderStars(game.ctx, game.stars);
    renderShip(game.ctx, game.ship);
    renderBullets(game.ctx, game.bullets);
    if (game.map) {
        renderConnectors(game.ctx, game.map);
    }
});
