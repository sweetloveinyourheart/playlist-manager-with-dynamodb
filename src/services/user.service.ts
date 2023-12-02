import { CreateNewUserDTO, UserLoginDTO } from "../dtos/user.dto";
import * as bcrypt from 'bcrypt'
import UserModel from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import AccountModel, { Account } from "../models/account.model";
import { BadRequestException } from "../exceptions/bad-request.exception";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../configs/variables.config";
import { NotFoundException } from "../exceptions/not-found.exception";

export default class UserService {

    async createUser(newUserData: CreateNewUserDTO) {
        const { username, password, ...userData } = newUserData

        const existedAccounts = await AccountModel.query({ username }).exec()
        if (existedAccounts.length > 0) throw new BadRequestException('User already exist !')

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

    async userLogin(userLogin: UserLoginDTO) {
        const accounts = await AccountModel.query({ username: userLogin.username }).exec()
        if (accounts.length === 0) throw new UnauthorizedException('Username or password is not valid !')
        
        const account = accounts[0]
        const isValidPassword = await bcrypt.compare(userLogin.password, account.password)
        if(!isValidPassword) throw new UnauthorizedException('Username or password is not valid !')
        
        const accountWithUser = await account.populate() as Account 
        const jwtPayload = { username: account.username, user_id: accountWithUser.user.user_id  }

        const accessToken = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '7d' })

        return { accessToken, refreshToken }
    }

    async getUserProfile(user_id?: string) {
        if(!user_id) throw new BadRequestException('No user_id given !')

        const user = await UserModel.get(user_id)
        if(!user) throw new NotFoundException('No profile found !')

        return user
    }
}