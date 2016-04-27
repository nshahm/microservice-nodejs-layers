class Constants {
    
    static SERVICE_EXCEPTION_MESSAGE: string = "error in your request";
    static SERVICE_RESPONSE_STATUS_SUCCESS: string  = "Success";
    static SERVICE_RESPONSE_STATUS_FAILURE: string  = "Failure";
    
    static CREATE_SUCCESS: string  = "Employee created successfully";
    static UPDATE_SUCCESS: string = "Employee updated successfully";
    static DELETE_SUCCESS: string = "Employee deleted successfully";
}
Object.seal(Constants);
export default Constants;
