class Engine{
    constructor(canvas){
        if(ValidateParam(canvas, "canvas", "object")){
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.lastTime = 0;
            this.timeScale = 1;
            this.objects = [];
        }
    }
    Start(){
        this.lastTime = (new Date()).getTime();
        this.requestAnimID = requestAnimationFrame(() => this.Render());
    }
    AddObject(obj){
        if(ValidateParam(obj, "obj", PhysicsObject)){
            this.objects.push(obj);
        }
    }
    AddObjects(objs){
        if(ValidateParam(objs, "objs", Array)){
            this.objects = this.objects.concat(objs);
        }
    }
    
    Render(){
        var t = this.lastTime;
        var nowTime = (new Date()).getTime();
        t -= nowTime;
        t /= 1000;
        t *= this.timeScale;
        t = Math.abs(t);
        this.lastTime = nowTime;
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].Update(t);
            var object = this.objects[i];
            var drawPos = object.GetDrawingPosition();
            var draw = true;
            if(object instanceof RectangleObject){
                if((drawPos.x + object.dimensions.x < 0 || drawPos.y < 0) || (drawPos.x > this.canvas.width || drawPos.y - object.dimensions.y > this.canvas.height)){
                    draw = false;
                }
            }
            
            if(draw){
                this.ctx.beginPath();
                console.log(this.canvas.height);
                console.log(drawPos);
                this.ctx.rect(drawPos.x, this.canvas.height - drawPos.y, object.dimensions.x, object.dimensions.y);
                this.ctx.strokeStyle = object.borderColour;
                this.ctx.stroke();
                this.ctx.fillStyle = object.fillColour;
                this.ctx.fill();
                this.ctx.closePath();
                //console.log(ctx.fillStyle + " => " + object.fillColour);
            }
        }
        this.requestAnimID = requestAnimationFrame(() => this.Render());
    }
    Stop(){
        cancelAnimationFrame(this.requestAnimID);
    }
    
}