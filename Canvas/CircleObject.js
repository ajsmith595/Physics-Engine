class CircleObject extends PhysicsObject{
    constructor(position = new Vector2D(0,0), velocity = new Vector2D(0,0), acceleration = new Vector2D(0,0), borderColour = "#ff0000", fillColour = "#00ff00", radius = 5){
        if(ValidateParam(position, "position", Vector2D) && ValidateParam(velocity, "velocity", Vector2D) && ValidateParam(acceleration, "acceleration", Vector2D) && ValidateParam(radius, "radius", "number") && ValidateParam(borderColour, "borderColour", "string") && ValidateParam(fillColour, "fillColour", "string")){
            super(position, velocity, acceleration, borderColour, fillColour);
            this.radius = radius;
        }
    }
    GetDrawingPosition(){
        return new Vector2D(this.position.x, this.position.y);
    }
    GetSelectionBoxDrawingPosition(){
        return new Vector2D(this.position.x - this.radius, this.position.y + this.radius);
    }
    GetDimensions(){
        return new Vector2D(this.radius * 2, this.radius * 2);
    }
}
