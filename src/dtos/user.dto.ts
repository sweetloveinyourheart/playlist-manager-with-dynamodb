import {
    IsString,
    IsEnum,
    IsOptional,
    Length
} from 'class-validator';

import { Gender } from '../models/user.model';

export class CreateNewUserDTO {
    constructor(data: Partial<CreateNewUserDTO>) {
        Object.assign(this, data)
    }

    @IsString()
    @Length(3, 50)
    username!: string

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