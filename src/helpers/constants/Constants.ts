
let pkg = require("../../../package.json");
class Constants {

    public static SUCCESS: string  = "Success";
    public static FAILURE: string  = "Failure";

    public static CREATE_SUCCESS: string  = "Created successfully";
    public static UPDATE_SUCCESS: string = "Updated successfully";
    public static DELETE_SUCCESS: string = "Deleted successfully";

    public static API_VERSION: string = "v" + pkg.version;
}

Object.seal(Constants);
export { Constants };

