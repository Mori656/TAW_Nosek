"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (typeof x === "number" && typeof y === "number") {
            this.x = x;
            this.y = x;
        }
        else {
            throw new Error("Współrzędne punktu muszą być liczbami.");
        }
    }
    Point.prototype.move = function (new_x, new_y) {
        this.x = new_x;
        this.y = new_y;
    };
    Point.prototype.rotate = function (p, angle) {
        var radians = (angle * Math.PI) / 180; // Konwersja kąta na radiany
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var mx = this.x - p.x;
        var my = this.y - p.y;
        this.x = mx * cos - my * sin + p.x;
        this.y = mx * sin + my * cos + p.y;
    };
    Point.prototype.scale = function (p, factor) {
        var mx = this.x - p.x;
        var my = this.y - p.y;
        this.x = p.x + mx * factor;
        this.y = p.y + my * factor;
    };
    return Point;
}());
exports.Point = Point;
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.a = new Point(x, y);
        this.b = new Point(x + width, y);
        this.c = new Point(x + width, y + height);
        this.d = new Point(x, y + height);
        this.rp = new Point((this.a.x + this.c.x) / 2, (this.a.y + this.c.y) / 2);
    }
    Rectangle.prototype.move = function (new_x, new_y) {
        this.a.move(new_x, new_y);
        this.b.move(new_x + this.width, new_y);
        this.c.move(new_x + this.width, new_y + this.height);
        this.d.move(new_x, new_y + this.height);
    };
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.rotate = function (angle) {
        this.rp = new Point((this.a.x + this.c.x) / 2, (this.a.y + this.c.y) / 2);
        this.a.rotate(this.rp, angle);
        this.b.rotate(this.rp, angle);
        this.c.rotate(this.rp, angle);
        this.d.rotate(this.rp, angle);
    };
    Rectangle.prototype.scale = function (factor) {
        this.rp = new Point((this.a.x + this.c.x) / 2, (this.a.y + this.c.y) / 2);
        this.a.scale(this.rp, factor);
        this.b.scale(this.rp, factor);
        this.c.scale(this.rp, factor);
        this.d.scale(this.rp, factor);
        this.width = Math.abs(this.a.x - this.c.x);
        this.height = Math.abs(this.a.y - this.c.y);
    };
    Rectangle.prototype.getPerimeter = function () {
        return 2 * this.width + 2 * this.height;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(x, y, side) {
        return _super.call(this, x, y, side, side) || this;
    }
    return Square;
}(Rectangle));
var rec = new Rectangle(1, 1, 10, 10);
console.log(rec.a, rec.b, rec.c, rec.d);
rec.move(5, 5);
console.log(rec.a, rec.b, rec.c, rec.d);
rec.rotate(90);
console.log(rec.a, rec.b, rec.c, rec.d);
console.log(rec.getArea());
console.log(rec.getPerimeter());
rec.scale(2);
console.log(rec.a, rec.b, rec.c, rec.d);
console.log(rec.getArea());
console.log(rec.getPerimeter());
var sq = new Square(4, 4, 10);
console.log(sq.a, sq.b, sq.c, sq.d);
console.log(sq.getArea());
console.log(sq.getPerimeter());
