import Read from "./../common/Read";
import Write from "./../common/Write";
interface BaseDataAccess<T> extends Read<T>, Write<T> {
    
}
export default BaseDataAccess;