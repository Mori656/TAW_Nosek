
interface Movable {
    move(dx: number, dy: number): void;
}

export class Point implements Movable{
    constructor(public x:number, public y:number) {}
    move(new_x:number, new_y:number){
        this.x = new_x;
        this.y = new_y;
    }
}

export class Rectangle implements Movable{
    
    a:Point;
    b:Point;
    c:Point;
    d:Point;

    constructor(x:number,y:number, public width:number,public height:number){
        this.a = new Point(x,y);
        this.b = new Point(x+width,y);
        this.c = new Point(x+width,y+height);
        this.d = new Point(x,y+height);
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
}

const rec = new Rectangle(1,1,10,10);
console.log(rec.a,rec.b,rec.c,rec.d);
rec.move(5,5)
console.log(rec.a,rec.b,rec.c,rec.d);