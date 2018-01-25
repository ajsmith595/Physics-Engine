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
            this.camera = new Camera(canvas);
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
        if(Math.floor(time / 500) > this.lastCheckedSecond){
            this.lastCheckedSecond = Math.floor(time / 500);
            this.fps = this.frames * 2;
            this.frames = 0;
        }
        this.camera.ClearScreen();
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
            if(i == 3){
                //this.camera.position = new Vector2D(object.position.x - this.canvas.width / 2, object.position.y - this.canvas.height / 2);
            }

            this.camera.RenderObject(object);
        }
        this.camera.RenderText("FPS: " + this.fps.toString(), 1, 30);
        this.frames += 1;
        this.requestAnimID = requestAnimationFrame(this.Render.bind(this));
    }

    Stop(){
        cancelAnimationFrame(this.requestAnimID);
    }

}
