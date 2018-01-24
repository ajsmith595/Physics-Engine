function ValidateParam(param, varName, type){
    if(typeof varName != "string"){
        throw "ParameterError:: Incorrect parameter type given for variable 'varName'; Type 'string' was expected but '" + typeof varName + "' was given";
    }
    else{
        if(typeof type === "string"){
            if(typeof param === type){
                return true;
            }
            else{
                throw "ParameterError:: Incorrect parameter type given for variable '" + varName + "'; Type '" + type + "' was expected but '" + typeof param + "' was given";
            }
        }
        else if(typeof type === "function"){
            if(!(param instanceof type)){
                throw "ParameterError:: Incorrect parameter type given for variable '" + varName + "'; Type 'string' was expected but '" + param.constructor.name + "' was given";
            }
            return true;
        }
        else{
            throw "ParameterError:: Incorrect parameter type given for variable 'type'; Type 'string' was expected but '" + typeof type + "' was given";
        }
    }
}