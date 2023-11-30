import {
    IsString,
    IsEnum,
    IsOptional
} from 'class-validator';

import { Gender } from '../models/user.model';

export class CreateNewUserDTO {
    constructor(data: Partial<CreateNewUserDTO>) {
        Object.assign(this, data)
    }

    @IsString()
    username!: string

    @IsString()
    password!: string

    @IsString()
    first_name!: string

    @IsString()
    last_name!: string

    @IsOptional()
    @IsString()
    address?: string

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender
    
}