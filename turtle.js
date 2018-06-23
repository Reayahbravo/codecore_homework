class Turtle {
    constructor(x,y) { 
        this.x = x;
        this.y = y;
        this.path = [[x,y]]; 
        //north=0; east=1; south=2; west=3
        this.direction = 1; 
    }
    right() { 
        if (this.direction === 3) { 
            this.direction = 0;
        }
        else {
            this.direction++;
        }
        return this;
    }
    left() {
        if (this.direction === 0) {
            this.direction = 3;
        }
        else {
            this.direction--;
        }
        return this;
    }
    forward(distance) {
        for (let i=0; i<distance; i++) {
            this.step();
        }
        return this;
    }
    step() {
        switch(this.direction) {
            case 0:
                this.y--;
                this.path.push([this.x, this.y]);
                break;
            case 1:
                this.x++;
                this.path.push([this.x, this.y]);
                break;
            case 2:
                this.y++;
                this.path.push([this.x, this.y]);
                break;
            case 3:
                this.x--;
                this.path.push([this.x, this.y]);
        }
    }
    allPoints() {
        return this.path;
    }
    print() {
        for (let i=this.minY(); i<=this.maxY()+1; i++) {
            let buff = '';
            for (let j=this.minX(); j<=this.maxX()+1; j++) {
                if (this.isPath(j,i)) {
                    buff += "*";
                }
                else {
                    buff += " ";
                }
            }
            console.log(buff);
        }
    }
    minX() {
        let min = 0;
        for (let i=0; i<this.path.length; i++) {
            if (this.path[i][0]<min){
                min=this.path[i][0];
            }
        }
        return min;
    }
    minY() {
        let min = 0;
        for (let i=0; i<this.path.length; i++) {
            if (this.path[i][1]<min){
                min=this.path[i][1];
            }
        }
        return min;
    }
    maxX() {
        let max = this.path[0][0];
        for (let i=1; i<this.path.length; i++) {
            if (this.path[i][0]>max){
                max=this.path[i][0];
            }
        }
        return max;
    }
    maxY() {
        let max = this.path[0][1];
        for (let i=1; i<this.path.length; i++) {
            if (this.path[i][1]>max){
                max=this.path[i][1];
            }
        }
        return max;
    }
    isPath(x,y) {
        for (let i=0; i<this.path.length; i++) {
            if (this.path[i][0]==x && this.path[i][1]==y) {
                return true;
            }
        }
        return false; //after checking every spot weve been to, if we still havent matched x,y return false
    }
}

new Turtle(0, 4)
  .forward(3)
  .left()
  .forward(3)
  .right()
  .forward(5)
  .right()
  .forward(8)
  .right()
  .forward(5)
  .right()
  .forward(3)
  .left()
  .forward(3)
  .print();
