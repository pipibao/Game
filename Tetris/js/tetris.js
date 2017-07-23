/**
 * Created by a369785853 on 2017/7/22.
 */
var game = {
    OFFSET: 15,
    CSIZE: 26,
    shape: null,
    pg: null,
    interval: 200,
    timer: null,
    CN:10,
    RN:20,
    wall: null,
    start: function(){
        this.wall = [];
        for (var r = 0; r < this.RN; r++) {
            this.wall[r]= new Array(this.CN)
        }
        var pg = document.getElementsByClassName('playground')[0];
        this.pg = pg;
        this.shape = this.randomShape();
        this.timer = setInterval(this.moveDown.bind(this),this.interval);
        document.onkeydown = function(e){
            e = e || window.event;
            switch (e.keyCode) {
                case 37:
                    this.moveLeft();
                    break;
                case 39:
                    this.moveRight();
                    break;
                case 40:
                    this.moveDown()
                    break;
                case 38:
                    this.rotateR();
                    break;
                case 90:
                    this.rotateL();
                    break;
            }

        }.bind(this)
    },
    randomShape: function(){
        switch (Math.floor(Math.random()*3)) {
            case 0:
                return new O();
            case 1:
                return new I();
            case 2:
                return new T();
        }

    },
    paintWall: function(){
        var frag = document.createDocumentFragment();
        for ( var r = this.RN-1; r >=0; r--) {
            if (this.wall[r].join('')=='') {
                break;
            } else {
                for (var c = 0; c < this.CN; c++) {
                    if(this.wall[r][c]!== undefined) {
                        this.paintCell(this.wall[r][c],frag)
                    }
                }
            }
        }
        this.pg.appendChild(frag);
    },
    paintCell: function(cell,frag){
        var img  = new Image;
        img.style.width = this.CSIZE+'px';
        img.style.left = this.OFFSET+this.CSIZE*cell.c+'px';
        img.style.top = this.OFFSET+this.CSIZE*cell.r+'px';
        img.src=cell.src;
        frag.appendChild(img)
    },
    paintShape: function(){
            var cells = this.shape.cells,
                frag = document.createDocumentFragment();
        for (var i = 0; i < cells.length; i++ ) {
            var cell = cells[i];
            this.paintCell(cell,frag)
        }
        this.pg.appendChild(frag)
    },
    paint: function(){
        var reg = /<img [^>]+>/g;
        this.pg.innerHTML = this.pg.innerHTML.replace(reg,'')
        this.paintShape();
        this.paintWall();
    },
    canDown: function(){
        for(var i=0;i<this.shape.cells.length;i++){
            var cell=this.shape.cells[i];
            if(cell.r==this.RN-1||
                this.wall[cell.r+1][cell.c]!==undefined){
                return false;
            }
        }
        return true;
    },
    canLeft: function(){
        var cells = this.shape.cells;
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            if (cell.c == 0 || this.wall[cell.r][cell.c-1] !== undefined) {
                return false;
            }
        }
        return true
    },
    moveLeft : function(){
        if(this.canLeft()) {
            this.shape.moveLeft();
            this.paint();
        }
    },
    canRight: function(){
        var cells = this.shape.cells;
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            if (cell.c == this.CN-1 || this.wall[cell.r][cell.c+1] !== undefined) {
                return false
            }
        }
        return true;
    },
    moveRight : function(){
        if (this.canRight()) {
            this.shape.moveRight();
            this.paint();
        }
    },
    landIntoWall: function(){
        for (var i = 0; i  < this.shape.cells.length; i++) {
            var cell = this.shape.cells[i];
            this.wall[cell.r][cell.c] = cell;
        }

    },
    canRotate: function(){
        for (var i = 0; i < this.shape.cells.length; i++) {
            var cell = this.shape.cells[i];
            if(cell.r<0||cell.r >= this.RN || cell.c<0 || cell.c >= this.CN || this.wall[cell.r][cell.c] !== undefined) {
                return false;
            }
        }
        return true;
    },
    rotateR: function(){
        this.shape.rotateR()
        if (!this.canRotate()) {
            this.shape.rotateL();
        }
    },
    rotateL : function () {
        this.shape.rotateL();
    },
    deleteRows: function(){
        for (var r = this.RN-1;r >=0;r--) {
            if(this.isfullRow(r)){
                this.deleteRow(r);
                r++;
            }
        }
    },
    isfullRow: function(r){
        var reg = /^,|,,|,$/g;
        if(reg.test(String(this.wall[r]))){
            return false
        }
        return true;
    },

    moveDown : function(){
        if(this.canDown()) {
            this.shape.moveDown()
        } else {
            this.landIntoWall();
            this.deleteRows();
            this.shape = this.randomShape();
        }
        this.paint()
    },
    deleteRow: function(r){
        for (;r>=0; r--) {
            this.wall[r] = this.wall[r-1];
            this.wall[r-1] = new Array(this.CN) ;
            for (var c = 0; c < this.CN; c++) {
                if (this.wall[r][c] !== undefined) {
                    this.wall[r][c].r++
                }
            }
            if (this.wall[r-2].join('') === ''){
                break;
            }
        }
    },
    init : function(){
        this.start();
        this.paintShape();
        var _this = this

    }
}
game.init()
