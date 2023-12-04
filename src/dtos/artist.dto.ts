import { IsEnum, IsOptional, IsString } from "class-validator"
import { ArtistGenre } from "../models/artist.model"

export class ArtistRegisterDTO {
    constructor(data: Partial<ArtistRegisterDTO>) {
        Object.assign(this, data)
    }

    @IsString()
    artist_name!: string
    
    @IsOptional()
    @IsString()
    country?: string

    @IsOptional()
    @IsEnum(ArtistGenre)
    genre?: ArtistGenre
}

export class EditRegisterDTO {
    constructor(data: Partial<ArtistRegisterDTO>) {
        Object.assign(this, data)
    }

    @IsOptional()
    @IsString()
    artist_name?: string
    
    @IsOptional()
    @IsString()
    country?: string

    @IsOptional()
    @IsEnum(ArtistGenre)
    genre?: ArtistGenre
}