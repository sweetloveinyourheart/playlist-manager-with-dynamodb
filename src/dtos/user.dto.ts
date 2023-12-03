import {
    IsString,
    IsEnum,
    IsOptional,
    Length,
    IsEmail
} from 'class-validator';

import { Gender } from '../models/user.model';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateNewUserDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *           format: email
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         first_name:
 *           type: string
 *           description: User's first name
 *         last_name:
 *           type: string
 *           description: User's last name
 *         address:
 *           type: string
 *           description: User's address
 *         gender:
 *           type: string
 *           description: User's gender
 */    
export class CreateNewUserDTO {
    constructor(data: Partial<CreateNewUserDTO>) {
        Object.assign(this, data)
    }

    @IsEmail()
    email!: string

    @IsString()
    @Length(6, 50)
    password!: string

    @IsString()
    @Length(3, 50)
    first_name!: string

    @IsString()
    @Length(3, 50)
    last_name!: string

    @IsOptional()
    @IsString()
    address?: string

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender
    
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 */
export class UserLoginDTO {
    constructor(data: Partial<UserLoginDTO>) {
        Object.assign(this, data)
    }

    @IsString()
    email!: string

    @IsString()
    password!: string
}