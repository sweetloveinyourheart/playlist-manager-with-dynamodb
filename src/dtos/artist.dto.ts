import { IsEnum, IsOptional, IsString } from "class-validator"
import { ArtistGenre } from "../models/artist.model"

/**
 * @swagger
 * components:
 *   schemas:
 *     ArtistRegisterDTO:
 *       type: object
 *       properties:
 *         artist_name:
 *           type: string
 *         country:
 *           type: string
 *         genre:
 *           type: string
 *           enum: [GENRE1, GENRE2, GENRE3]  # Replace GENRE1, GENRE2, GENRE3 with actual values from ArtistGenre enum
 *       required:
 *         - artist_name
 *
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     EditArtistDTO:
 *       type: object
 *       properties:
 *         artist_name:
 *           type: string
 *         country:
 *           type: string
 *         genre:
 *           type: string
 *           enum: [GENRE1, GENRE2, GENRE3]  # Replace GENRE1, GENRE2, GENRE3 with actual values from ArtistGenre enum
 *
 */
export class EditArtistDTO {
    constructor(data: Partial<EditArtistDTO>) {
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