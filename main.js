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
    vel: new Vec2(0, 0),
    acc: 0,
    aVel: 0, // angular velocity
    aAcc: 0, // angular acceleration
    rot: 0,
};

function renderShip(ship) {
    ctx.save();
    ctx.translate(ship.pos.x, ship.pos.y);
    ctx.rotate(ship.rot);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 30);
    ctx.lineTo(-10, 30);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = randomShipColor();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
}

function update() {
    ship.vel = ship.vel.addScalar(ship.acc);
    ship.vel = Vec2.fromAngle(-ship.rot).mulScalar(-1);
    ship.pos = ship.pos.add(ship.vel);
    ship.aVel += ship.aAcc;
    ship.aVel = clamp(ship.aVel, -0.1, 0.1);
    ship.rot += ship.aVel;
}

window.addEventListener('keyup', function (e) {
    if (e.key === 'a' || e.key === 'd' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        ship.aAcc = 0;
    }
});

window.addEventListener('keypress', function (e) {
    console.log(ship.acc);
    let acc = 0,
        thrust = 0.01;
    switch (e.key) {
    case 'w':
    case 'ArrowUp':
        acc = -thrust;
        break;
    case 'a':
    case'ArrowLeft':
        ship.aAcc = -Math.PI/1800;
        break;
    case 's':
    case 'ArrowDown':
        acc = thrust;
        break;
    case 'd':
    case'ArrowRight':
        ship.aAcc = Math.PI/1800;
        break;
    case ' ':
        acc = ship.acc*2;
        break;
    }
    ship.acc = acc;
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
