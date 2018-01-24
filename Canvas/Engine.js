class Engine{
    constructor(canvas){
        if(ValidateParam(canvas, "canvas", "object")){
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.ctx.font = '30px Roadway';
            this.lastTime = 0;
            this.timeScale = 1;
            this.frames = 0;
            this.objects = [];
        }
    }
    Start(){
        this.lastTime = 0;
        this.lastCheckedSecond = 0;
        this.frames = 0;
        this.fps = 0;
        this.requestAnimID = requestAnimationFrame(this.Render.bind(this));
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
    Render(time){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        if(Math.floor(time / 500) > this.lastCheckedSecond){
            this.lastCheckedSecond = Math.floor(time / 500);
            this.fps = this.frames * 2;
            this.frames = 0;
        }
        this.ctx.fillStyle = "black";
        this.ctx.fillText("FPS: " + this.fps.toString(), 1, 30);
        var t = this.lastTime;
        var nowTime = time;
        t -= nowTime;
        t /= 1000;
        t *= this.timeScale;
        t = Math.abs(t);
        this.lastTime = nowTime;

        for(var i = 0; i < this.objects.length; i++){

            this.objects[i].Update(t);
            var object = this.objects[i];
            var selectionBox = object.GetSelectionBoxDrawingPosition();
            selectionBox.y = this.canvas.height - selectionBox.y;
            var drawPos = object.GetDrawingPosition();
            drawPos.y = this.canvas.height - drawPos.y;
            var draw = true;
            if((selectionBox.x + object.GetDimensions().x < 0 || selectionBox.y < 0) || (selectionBox.x > this.canvas.width || selectionBox.y - object.GetDimensions().y > this.canvas.height)){
                draw = false;
            }

            if(draw){
                this.ctx.beginPath();
                if(object instanceof RectangleObject){
                    this.ctx.rect(drawPos.x, drawPos.y, object.dimensions.x, object.dimensions.y);
                }
                else if(object instanceof CircleObject){
                    this.ctx.arc(drawPos.x, drawPos.y, object.radius, 0, 2 * Math.PI);
                }
                this.ctx.strokeStyle = object.borderColour;
                if(object instanceof CircleObject){
                    console.log(this.ctx.strokeStyle);
                }
                this.ctx.stroke();
                this.ctx.fillStyle = object.fillColour;
                this.ctx.fill();
                this.ctx.closePath();
                //console.log(ctx.fillStyle + " => " + object.fillColour);

                if(object.selected){
                    this.ctx.beginPath();
                    this.ctx.moveTo(drawPos.x, 0);
                    this.ctx.lineTo(drawPos.x, canvas.height);
                    this.ctx.moveTo(0, drawPos.y);
                    this.ctx.lineTo(canvas.width, drawPos.y);
                    this.ctx.strokeStyle = "rgba(255, 0, 255, 0.3)";
                    var dims = object.GetDimensions();
                    this.ctx.rect(selectionBox.x, selectionBox.y, dims.x, dims.y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }

            }
        }
        this.frames += 1;
        this.requestAnimID = requestAnimationFrame(this.Render.bind(this));
    }
    Stop(){
        cancelAnimationFrame(this.requestAnimID);
    }

}
