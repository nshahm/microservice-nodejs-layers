class Response {
    
    // TODO - introduce status codes.
    status: String;
    message: Object;
    
    constructor(status: String, message: Object) {
        
        this.status = status;
        this.message = message;
    }
}

export default Response;