const { randomRange } = require('./random');

class Vec2 {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    clampMag(m) {
        const mag = this.mag();
        if (mag > m) {
            return this.normalize().mulScalar(m);
        }
        return this;
    }

    mulScalar(s) {
        return new Vec2(this.x*s, this.y*s);
    }

    addScalar(s) {
        return new Vec2(this.x+s, this.y+s);
    }

    mul(o) {
        return new Vec2(this.x*o.x, this.y*o.y);
    }

    normalize() {
        const mag = this.mag();
        if (mag === 0) {
            return new Vec2(0, 0);
        }
        return new Vec2(this.x/mag, this.y/mag);
    }

    angle() {
        const norm = this.normalize();
        return Math.atan(norm.x, norm.y);
    }

    snapAngle(o) {
        const angle = this.sub(o).angle(),
              snapThreshold = Math.PI/6,
              newAngle = Math.floor(angle/snapThreshold) * snapThreshold;

        return Vec2.fromAngleCorrect(newAngle);
    }

    roundTo(s) {
        const nx = Math.round(this.x/s),
              ny = Math.round(this.y/s);

        return new Vec2(nx * s, ny * s);
    }

    mag() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    add(o) {
        return new Vec2(this.x+o.x, this.y+o.y);
    }

    sub(o) {
        return new Vec2(this.x-o.x, this.y-o.y);
    }

    static fromAngleCorrect(rads) {
        return new Vec2(Math.sin(rads), -Math.cos(rads));
    }
    
    static random(minX, maxX, minY, maxY) {
        return new Vec2(randomRange(minX, maxX), randomRange(minY, maxY));
    }

    hyp() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    static distance(v1, v2) {
        return v1.sub(v2).hyp();
    }
}

module.exports = Vec2;
