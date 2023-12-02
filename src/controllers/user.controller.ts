import { NextFunction, Request, Response } from "express";
import { ValidateBody } from "../decorators/validate-body.decorator";
import { CreateNewUserDTO } from "../dtos/user.dto";
import UserService from "../services/user.service";

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

    async login(request: Request, response: Response, next: NextFunction) {

    }

    async getUserProfile(request: Request, response: Response, next: NextFunction) {

    }
}