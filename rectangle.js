"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = exports.Point = void 0;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(new_x, new_y) {
        this.x = new_x;
        this.y = new_y;
    }
}
exports.Point = Point;
class Rectangle {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.a = new Point(x, y);
        this.b = new Point(x + width, y);
        this.c = new Point(x + width, y + height);
        this.d = new Point(x, y + height);
    }
    move(new_x, new_y) {
        this.a.move(new_x, new_y);
        this.b.move(new_x + this.width, new_y);
        this.c.move(new_x + this.width, new_y + this.height);
        this.d.move(new_x, new_y + this.height);
    }
    getArea() {
        return this.width * this.height;
    }
}
exports.Rectangle = Rectangle;
const rec = new Rectangle(1, 1, 10, 10);
console.log(rec.a, rec.b, rec.c, rec.d);
rec.move(5, 5);
console.log(rec.a, rec.b, rec.c, rec.d);
