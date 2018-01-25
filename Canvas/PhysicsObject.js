class PhysicsObject{
    constructor(position = new Vector2D(0,0), velocity = new Vector2D(0,0), acceleration = new Vector2D(0,0), borderColour = "#ff0000", fillColour = "#00ff00"){
        if(ValidateParam(position, "position", Vector2D) && ValidateParam(velocity, "velocity", Vector2D) && ValidateParam(acceleration, "acceleration", Vector2D) && ValidateParam(borderColour, "borderColour", "string")&& ValidateParam(fillColour, "fillColour", "string")){
            this.position = position;
            this.velocity = velocity;
            this.acceleration = acceleration;
            this.borderColour = borderColour;
            this.fillColour = fillColour;
            this.selected = false;
        }
    }

    GetDrawingPosition(){
        throw "NotImplementedException:: function 'GetDrawingPosition' has not been implemented into the class '" + this.constructor.name + "'.";
    }
    GetSelectionBoxDrawingPosition(){
        throw "NotImplementedException:: function 'GetSelectionBoxDrawingPosition' has not been implemented into the class '" + this.constructor.name + "'.";
    }
    GetCenter(){
        throw "NotImplementedException:: function 'GetCenter' has not been implemented into the class '" + this.constructor.name + "'.";
    }
    GetDimensions(){
        throw "NotImplementedException:: function 'GetDimensions' has not been implemented into the class '" + this.constructor.name + "'.";
    }

    Select(){
        this.selected = !this.selected;
    }
    Update(t){
        //s = u + at
        var newVel = Vector2D.Add(Vector2D.Multiply(this.acceleration, t), this.velocity);
        var posChange = Vector2D.Multiply(Vector2D.Add(newVel, this.velocity), t);
        this.position = Vector2D.Add(this.position, posChange);
        this.velocity = newVel;
    }
}
