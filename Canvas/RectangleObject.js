class RectangleObject extends PhysicsObject{
    constructor(position = new Vector2D(0,0), velocity = new Vector2D(0,0), acceleration = new Vector2D(0,0), borderColour = "#ff0000", fillColour = "#00ff00", dimensions = new Vector2D(5,5)){
        if(ValidateParam(position, "position", Vector2D) && ValidateParam(velocity, "velocity", Vector2D) && ValidateParam(acceleration, "acceleration", Vector2D) && ValidateParam(dimensions, "dimensions", Vector2D) && ValidateParam(borderColour, "borderColour", "string") && ValidateParam(fillColour, "fillColour", "string")){
            super(position, velocity, acceleration, borderColour, fillColour);
            this.dimensions = dimensions;
        }
    }
    GetDrawingPosition(){
        return new Vector2D(this.position.x - this.dimensions.x / 2, this.position.y + this.dimensions.y / 2);
    }
}