const canvas = document.getElementById('screen'),
      ctx = canvas.getContext('2d');

function makeStars(n=50) {
    const starColors = ['yellow', 'white', 'lightblue'],
          stars = [];
    for (let i=0; i<n; ++i) {
        stars.push({
            pos: Vec2.random(0, canvas.width, 0, canvas.height),
            r: randomRange(1, 2),
            color: starColors[randomRange(0, starColors.length-1)],
        });
    }
    return stars;
}

const stars = makeStars();

function renderBackground() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderStars(stars) {
    for (const star of stars) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(star.pos.x, star.pos.y, star.r, 0, Math.PI*2);
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}

const ship = {
    pos: new Vec2(canvas.width/2, canvas.height/2),
    vel: 0,
    acc: 0, // a constant not a vector because the direction is determined by "dir"
    aVel: 0, // angular velocity
    aAcc: 0, // angular acceleration
    dir: 0,
};

function renderFlame(color) {
    ctx.beginPath();
    ctx.moveTo(10, 30);
    ctx.lineTo(5, 30);
    ctx.lineTo(0, 37);
    ctx.lineTo(-5, 30);
    ctx.lineTo(-10, 30);
    ctx.lineTo(0, 20);
    ctx.strokeStyle = color;
    ctx.closePath();
    ctx.stroke();
}

function renderShip(ship) {
    ctx.save();
    ctx.translate(ship.pos.x, ship.pos.y);
    ctx.rotate(ship.dir);

    if (ship.acc !== 0) {
        ctx.save();
        ctx.scale(0.5, 0.5);
        ctx.translate(0, 20);
        renderFlame('yellow');
        ctx.restore();
        renderFlame('red');
    }

    ctx.beginPath();
    ctx.strokeStyle = randomShipColor();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, 30);
    ctx.lineTo(0, 20);
    ctx.lineTo(10, 30);
    ctx.lineTo(10, 30);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
}

function update() {
    ship.vel = clamp(ship.vel + ship.acc, -4, 2);
    ship.aVel = clamp(ship.aVel + ship.aAcc, -0.1, 0.1);
    ship.dir += ship.aVel;

    //    ship.acc -= 0.001;

    const vel = Vec2.fromAngle(-ship.dir).mulScalar(ship.vel);
    ship.pos = ship.pos.add(vel);
}

window.addEventListener('keyup', function (e) {
    //    if (e.key === 'a' || e.key === 'd' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    ship.aAcc = 0;
    ship.acc = 0;
    //    }
});

window.addEventListener('keypress', function (e) {
    const thrust = 0.05;
    switch (e.key) {
    case 'w':
    case 'ArrowUp':
        ship.acc = -thrust;
        break;
    case 'a':
    case'ArrowLeft':
        ship.aAcc = -Math.PI/1500;
        break;
    case 's':
    case 'ArrowDown':
        ship.acc = thrust;
        break;
    case 'd':
    case'ArrowRight':
        ship.aAcc = Math.PI/1500;
        break;
    case ' ':
        ship.acc = ship.acc*2;
        break;
    }
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    renderBackground();
    renderStars(stars);
    renderShip(ship);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
