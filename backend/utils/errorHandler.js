//generally we are required to write a lot of if else statements but now no need..... this handler is now a
//in built class

class ErrorHandler extends Error{
    constructor(message , statusCode){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;