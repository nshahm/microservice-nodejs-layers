class Constants {
    
    static SERVICE_EXCEPTION_MESSAGE: string = "error in your request";
    static SERVICE_RESPONSE_STATUS_SUCCESS: string  = "Success";
    static SERVICE_RESPONSE_STATUS_FAILURE: string  = "Failure";
    
    static EMPLOYEE_CREATE_SUCCESS: string  = "Employee created successfully";
    static EMPLOYEE_UPDATE_SUCCESS: string = "Employee updated successfully";
    static EMPLOYEE_DELETE_SUCCESS: string = "Employee deleted successfully";
}
Object.seal(Constants);
export default Constants;
