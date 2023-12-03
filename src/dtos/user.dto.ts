import {
    IsString,
    IsEnum,
    IsOptional,
    Length,
    IsEmail
} from 'class-validator';

import { Gender } from '../models/user.model';

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

export class UserLoginDTO {
    constructor(data: Partial<UserLoginDTO>) {
        Object.assign(this, data)
    }

    @IsString()
    email!: string

    @IsString()
    password!: string
}