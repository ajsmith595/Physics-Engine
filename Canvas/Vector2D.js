class Vector2D{
    constructor(x = 0, y = 0){
        if(ValidateParam(x, "x", "number")){
            this.x = x;
            this.y = y;
        }
    }
    static FromMagnitudeAndAngle(angle, magnitude, degrees = false){
        if(ValidateParam(angle, "angle", "number") && ValidateParam(magnitude, "magnitude", "number") && ValidateParam(degrees, "degrees", "boolean")){
            if(degrees){
                angle *= Math.PI;
                angle /= 180;
            }
            let vect = new Vector2D(Math.sin(angle) * magnitude, Math.cos(angle) * magnitude);
            return vect;
        }
    }
    
    static Add(vect, vect2){
        if(ValidateParam(vect, "vect", Vector2D) && ValidateParam(vect2, "vect2", Vector2D)){
            var x = vect.x + vect2.x;
            var y = vect.y + vect2.y;
            return new Vector2D(x, y);
        }
    }
    
    static Subtract(vect, vect2){
        if(ValidateParam(vect, "vect", Vector2D) && ValidateParam(vect2, "vect2", Vector2D)){
            var x = vect.x - vect2.x;
            var y = vect.y - vect2.y;
            return new Vector2D(x, y);
        }
    }
    
    static Multiply(vect, val){
        if(ValidateParam(vect, "vect", Vector2D) && ValidateParam(val, "val", "number")){
            var x = vect.x * val;
            var y = vect.y * val;
            return new Vector2D(x, y);
        }
    }
    static Divide(vect, val){
        if(ValidateParam(vect, "vect", Vector2D) && ValidateParam(val, "val", "number")){
            return Vector2D.Multiply(vect, 1/val);
        }
    }
    
    toString(){
        return "[" + this.x + ", " + this.y + "]";
    }
    
    static Gravity(){ 
        return new Vector2D(0, -9.80665);
    }
}

