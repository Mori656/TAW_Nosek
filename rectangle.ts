
interface Movable {
    move(dx: number, dy: number): void;
}

export class Point implements Movable{
    x:number;
    y:number;
    constructor(x:any, y:any) {
        if(typeof x === "number" && typeof y === "number"){
            this.x = x;
            this.y = x;
        }else{
            throw new Error("Współrzędne punktu muszą być liczbami.");
        }
    }
    move(new_x:number, new_y:number){
        this.x = new_x;
        this.y = new_y;
    }
    rotate(p:Point,angle:number){
        const radians = (angle * Math.PI) / 180; // Konwersja kąta na radiany
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        const mx = this.x - p.x;
        const my = this.y - p.y;

        this.x = mx * cos - my * sin + p.x;
        this.y = mx * sin + my * cos + p.y;
    }
    scale(p:Point,factor:number){
        const mx = this.x - p.x;
        const my = this.y - p.y;

        this.x = p.x + mx * factor;
        this.y = p.y + my * factor;
    }
}

export class Rectangle implements Movable{
    
    a:Point;
    b:Point;
    c:Point;
    d:Point;
    rp:Point;

    constructor(x:number,y:number, public width:number,public height:number){
        this.a = new Point(x,y);
        this.b = new Point(x+width,y);
        this.c = new Point(x+width,y+height);
        this.d = new Point(x,y+height);
        this.rp = new Point((this.a.x+this.c.x)/2,(this.a.y + this.c.y)/2);
    }
    move(new_x:number, new_y:number){
        this.a.move(new_x,new_y);
        this.b.move(new_x+this.width,new_y);
        this.c.move(new_x+this.width,new_y+this.height);
        this.d.move(new_x,new_y+this.height);
    }
    getArea():number{
        return this.width*this.height
    }
    rotate(angle:number){
        this.rp = new Point((this.a.x+this.c.x)/2,(this.a.y + this.c.y)/2);
        this.a.rotate(this.rp,angle);
        this.b.rotate(this.rp,angle);
        this.c.rotate(this.rp,angle);
        this.d.rotate(this.rp,angle);
    }
    scale(factor:number){
        this.rp = new Point((this.a.x+this.c.x)/2,(this.a.y + this.c.y)/2);
        this.a.scale(this.rp,factor);
        this.b.scale(this.rp,factor);
        this.c.scale(this.rp,factor);
        this.d.scale(this.rp,factor);
        
        this.width = Math.abs(this.a.x - this.c.x);
        this.height = Math.abs(this.a.y - this.c.y);
    }
    getPerimeter():number{
        return 2 * this.width + 2 * this.height
    }
}

class Square extends Rectangle{
    constructor(x:number, y:number, side:number){
        super(x,y,side,side)
    }
}

const rec = new Rectangle(1,1,10,10);
console.log(rec.a,rec.b,rec.c,rec.d);
rec.move(5,5);
console.log(rec.a,rec.b,rec.c,rec.d);
rec.rotate(90);
console.log(rec.a,rec.b,rec.c,rec.d);
console.log(rec.getArea())
console.log(rec.getPerimeter())
rec.scale(2);
console.log(rec.a,rec.b,rec.c,rec.d);
console.log(rec.getArea())
console.log(rec.getPerimeter())

const sq = new Square(4,4,10);
console.log(sq.a,sq.b,sq.c,sq.d);
console.log(sq.getArea())
console.log(sq.getPerimeter())