class Camera{
    constructor(canvas){
        if(ValidateParam(canvas, 'canvas', "object")){
            this.position = new Vector2D(0, 0);
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
            this.context.font = '30px Roadway';
            this.backgroundColour = "black";
            this.fontColour = "white";
        }
    }
    RenderObject(object){
        if(ValidateParam(object, "object", PhysicsObject)){
            var selectionBox = object.GetSelectionBoxDrawingPosition();
            // selectionBox.y = this.canvas.height - selectionBox.y;
            // selectionBox = Vector2D.Subtract(selectionBox, new Vector2D(this.position.x, this.position.y * -1));
            var drawPos = object.GetDrawingPosition();
            // drawPos.y = this.canvas.height - drawPos.y; //ApplyRenderFix/////////////////////////////////////////////////////////////
            // drawPos = Vector2D.Subtract(drawPos, new Vector2D(this.position.x, this.position.y * -1));
            this.ApplyRenderFix(drawPos);
            this.ApplyRenderFix(selectionBox);

            if((selectionBox.x + object.GetDimensions().x < 0 || selectionBox.y + object.GetDimensions().y < 0) || (selectionBox.x > this.canvas.width || selectionBox.y - object.GetDimensions().y > this.canvas.height)){
                // Do not render
            }
            else{
                this.context.beginPath();
                if(object instanceof RectangleObject){
                    this.context.rect(drawPos.x, drawPos.y, object.dimensions.x, object.dimensions.y);
                }
                else if(object instanceof CircleObject){
                    this.context.arc(drawPos.x, drawPos.y, object.radius, 0, 2 * Math.PI);
                }
                this.context.strokeStyle = object.borderColour;
                this.context.stroke();
                this.context.fillStyle = object.fillColour;
                this.context.fill();
                this.context.closePath();

                if(object.selected){
                    this.context.strokeStyle = "rgba(255, 0, 255, 0.3)";
                    this.context.beginPath();
                    var dims = object.GetDimensions();
                    this.context.rect(selectionBox.x, selectionBox.y, dims.x, dims.y);
                    this.context.stroke();
                    this.context.closePath();
                }
            }

            if(object.selected){
                this.context.beginPath();
                var center = object.GetCenter();
                this.ApplyRenderFix(center);
                if(center.x <= canvas.width && center.x >= 0){
                    this.context.moveTo(center.x, 0);
                    this.context.lineTo(center.x, canvas.height);
                }
                if(center.y <= canvas.height && center.y >= 0){
                    this.context.moveTo(0, center.y);
                    this.context.lineTo(canvas.width, center.y);
                }
                this.context.strokeStyle = "rgba(255, 0, 255, 0.3)";
                this.context.stroke();
                this.context.closePath();
            }
        }
    }
    ClearScreen(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.context.rect(0,0,this.canvas.width, this.canvas.height);
        this.context.fillStyle = this.backgroundColour;
        this.context.fill();
    }

    RenderText(text, x, y){
        if(ValidateParam(text, "text", "string") && ValidateParam(x, "x", "number") && ValidateParam(y, "y", "number")){
            this.context.fillStyle = this.fontColour;
            this.context.fillText(text, x, y);
        }
    }

    ApplyRenderFix(vect){
        if(ValidateParam(vect, "vect", Vector2D)){
            vect.y = this.canvas.height - vect.y;
            vect = Vector2D.Subtract(vect, new Vector2D(this.position.x, this.position.y * -1));
            return vect;
        }
    }
}
