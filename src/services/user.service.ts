import { CreateNewUserDTO } from "../dtos/user.dto";
import * as bcrypt from 'bcrypt'
import UserModel from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import AccountModel from "../models/account.model";
import { BadRequestException } from "../exceptions/bad-request.exception";

export default class UserService {
    async createUser(newUserData: CreateNewUserDTO) {
        const { username, password, ...userData } = newUserData

        const existedAccounts = await AccountModel.query({ username }).exec()
        if(existedAccounts.length > 0) throw new BadRequestException('User already exist !')

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newUserData.password, salt)

        const newUser = await UserModel.create({
            ...userData,
            user_id: uuidv4()
        })

        const newAccount = await AccountModel.create({
            username,
            password: hashedPassword,
            user: newUser
        })

        return true
    }
}