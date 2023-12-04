import { NextFunction, Request, Response } from "express";
import { ValidateBody } from "../decorators/validate-body.decorator";
import { CreateNewUserDTO, UpdateUserDTO, UserLoginDTO } from "../dtos/user.dto";
import UserService from "../services/user.service";
import { AuthGuard } from "../decorators/auth-guard.decorator";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

const userService = new UserService()

export default class UserController {

    @ValidateBody(CreateNewUserDTO)
    async register(request: Request, response: Response, next: NextFunction) {
        try {
            const newUserData: CreateNewUserDTO = request.body
            const result = await userService.createUser(newUserData)

            return response.status(201).json({ success: result })
        } catch (error) {
            next(error)
        }
    }

    @ValidateBody(UserLoginDTO)
    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const userLogin: UserLoginDTO = request.body
            const data = await userService.userLogin(userLogin)

            return response.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(request: Request, response: Response, next: NextFunction) {
        try {
            const refreshToken = request.query['refresh-token'] as string
            if (!refreshToken) throw new UnauthorizedException()

            const data = await userService.refreshNewToken(refreshToken)

            return response.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    @AuthGuard()
    async getUserProfile(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.user
            if (!user) throw new UnauthorizedException()

            const profile = await userService.getUserProfile(user.user_id)

            return response.status(200).json(profile)
        } catch (error) {
            next(error)
        }
    }

    @AuthGuard()
    @ValidateBody(UpdateUserDTO)
    async updateUserProfile(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.user
            if (!user) throw new UnauthorizedException()

            const updateData: UpdateUserDTO = request.body

            const profile = await userService.updateUserProfile(user.user_id, updateData)

            return response.status(200).json(profile)
        } catch (error) {
            next(error)
        }
    }
}