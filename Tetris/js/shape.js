/**
 * Created by a369785853 on 2017/7/22.
 */
function Cell(r,c,src) {
    this.r = r;
    this.c = c;
    this.src = src;
}
function Shape (r0,c0,r1,c1,r2,c2,r3,c3,src,states,orgi) {
    this.cells = [
        new Cell(r0,c0,src),
        new Cell(r1,c1,src),
        new Cell(r2,c2,src),
        new Cell(r3,c3,src)
    ];
    this.states =states;
    this.orgCell = this.cells[orgi];
    this.statei = 0;
}
Shape.prototype = {
    constructor: Shape,
    moveDown : function() {
        var _this=this;
        for (var i = 0; i < _this.cells.length; i++) {
            _this.cells[i].r++
        }
    },
    moveLeft : function(){
        var _this=this;
        for (var i = 0; i < _this.cells.length; i++) {
            _this.cells[i].c--
        }
    },
    moveRight: function(){
        var _this=this;
        for (var i = 0; i < _this.cells.length; i++) {
            _this.cells[i].c++
        }
    },
    rotateR: function(){//顺时针旋转
        this.statei++;
        if(this.statei==this.states.length){
            this.statei=0;
        }
        this.rotate();
    },
    rotate: function(){
        var state=this.states[this.statei];
        for(var i=0;i<this.cells.length;i++){
            var cell=this.cells[i];
            cell.r=this.orgCell.r+state['r'+i];
            cell.c=this.orgCell.c+state['c'+i];
        }
    },
    rotateL: function(){//逆时针旋转
        this.statei--;
        if(this.statei<0){
            this.statei=this.states.length-1;
        }
        this.rotate();
    },
}
function State(r0,c0,r1,c1,r2,c2,r3,c3){
    this.r0=r0; this.c0=c0;
    this.r1=r1; this.c1=c1;
    this.r2=r2; this.c2=c2;
    this.r3=r3; this.c3=c3;
}
function T () {
    Shape.call(this,0,3,0,4,0,5,1,4,'img/T.png',[
        new State(0,-1, 0,0, 0,+1, +1,0),
        new State(-1,0, 0,0, +1,0, 0,-1),
        new State(0,+1, 0,0, 0,-1, -1,0),
        new State(+1,0, 0,0, -1,0, 0,+1),
    ],1)
}
Object.setPrototypeOf(T.prototype,Shape.prototype);

function I () {
    Shape.call(this,0,3,0,4,0,5,0,6,'img/I.png',[
        new State(0,-1, 0,0, 0,+1, 0,+2),
        new State(-1,0, 0,0, +1,0, +2,0)
    ],1)
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function O () {
    Shape.call(this,0,4,0,5,1,4,1,5,'img/O.png',[new State(0,-1,0,0,+1,-1,+1,0)],1)
}
Object.setPrototypeOf(O.prototype,Shape.prototype);