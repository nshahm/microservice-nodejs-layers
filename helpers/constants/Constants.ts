class Constants {
    
    static SERVICE_EXCEPTION_MESSAGE: string = "error occurred";
    static SERVICE_RESPONSE_STATUS_SUCCESS: string  = "Success";
    static SERVICE_RESPONSE_STATUS_FAILURE: string  = "Failure";
    
    static CREATE_SUCCESS: string  = "Created successfully";
    static UPDATE_SUCCESS: string = "Updated successfully";
    static DELETE_SUCCESS: string = "Deleted successfully";
}
Object.seal(Constants);
export default Constants;
