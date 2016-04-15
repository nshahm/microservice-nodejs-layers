class ErrorObject {
    
    status: String;
    message: Object;
    
    constructor(status: String, response: Object) {
        this.status = status;
        this.message = response;
    }
}

export = ErrorObject;