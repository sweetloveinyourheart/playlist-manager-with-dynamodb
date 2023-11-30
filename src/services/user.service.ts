import { CreateNewUserDTO } from "../dtos/user.dto";

export default class UserService {
    async createUser(newUserData: CreateNewUserDTO) {
        console.log(newUserData);
    }
}