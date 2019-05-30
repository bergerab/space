const { randomShipColor } = require('./random');

function renderStars(ctx, stars) {
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

function renderFlame(ctx, color) {
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

function renderShip(ctx, ship) {
    ctx.save();
    ctx.translate(ship.pos.x, ship.pos.y);
    ctx.rotate(ship.dir);

    if (ship.acc !== 0) {
        ctx.save();
        ctx.scale(0.5, 0.5);
        ctx.translate(0, 20);
        renderFlame(ctx, 'yellow');
        ctx.restore();
        renderFlame(ctx, 'red');
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

function renderBullets(ctx, bullets) {
    for (const bullet of bullets) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(bullet.pos.x, bullet.pos.y);
        const endPoint = bullet.dir.mulScalar(bullet.len).add(bullet.pos);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.strokeStyle = bullet.color;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

function renderBackground(ctx, width, height) {
    ctx.fillRect(0, 0, width, height);
}

function renderConnectors(ctx, connectors) {
    for (const connector of connectors) {
        renderConnector(ctx, connector.p1, connector.p2, { showDots: false });
    }
}

function renderConnector(ctx, p1, p2, init={}) {
    const r = init.r || 5,
          color = init.color || 'green',
          showDots = init.showDots === undefined ? true : init.showDots;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p1.x - r, p1.y - r);
    ctx.lineTo(p2.x - r, p2.y - r);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    if (showDots) {
        renderDot(ctx, p1, { r, color });
        renderDot(ctx, p2, { r, color });
    }
}

function renderDot(ctx, p, init={}) {
    const color = init.color || 'green',
          r = init.r || 5,
          type = init.type || 'fill'; // fill or stroke

    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x - r, p.y - r, r, 0, Math.PI*2);
    if (type === 'fill') {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}

Object.assign(module.exports, {
    renderBullets,
    renderBackground,
    renderStars,
    renderFlame,
    renderShip,
    renderDot,
    renderConnector,
    renderConnectors,
});
