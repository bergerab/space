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

    mag() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    add(o) {
        return new Vec2(this.x+o.x, this.y+o.y);
    }

    static fromAngle(rads) {
        return new Vec2(Math.sin(rads), Math.cos(rads));
    }
    
    static random(minX, maxX, minY, maxY) {
        return new Vec2(randomRange(minX, maxX), randomRange(minY, maxY));
    }
}
