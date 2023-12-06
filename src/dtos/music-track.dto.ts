import { IsArray, IsDataURI, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { PlaylistGenre } from "../models/music-track.model"

/**
 * @swagger
 * components:
 *   schemas:
 *     NewMusicTrackDTO:
 *       type: object
 *       properties:
 *         track_title:
 *           type: string
 *           description: The title of the music track.
 *         artists:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of artist names associated with the music track.
 *         genre:
 *           type: string
 *           enum: 
 *             - rock
 *             - pop
 * 
 *           description: The genre of the music track.
 *         release_date:
 *           type: string
 *           format: date-time
 *           description: The release date of the music track in ISO 8601 format.
 *         duration:
 *           type: number
 *           description: The duration of the music track in seconds.
 *         url:
 *           type: string
 *           format: uri
 *           description: The URL of the music track, represented as a Data URI.
 */

export class NewMusicTrackDTO {
    constructor(data: Partial<NewMusicTrackDTO>) {
        Object.assign(this, data)
    }

    @IsString()
    track_title!: string

    @IsArray()
    artists!: string[]

    @IsEnum(PlaylistGenre)
    genre!: PlaylistGenre

    @IsDateString()
    release_date!: Date

    @IsNumber()
    duration!: number

    @IsDataURI()
    url!: string
}


/**
 * @swagger
 * components:
 *   schemas:
 *     EditMusicTrackDTO:
 *       type: object
 *       properties:
 *         track_title:
 *           type: string
 *           description: The title of the music track.
 *         artists:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of artist names associated with the music track.
 *         genre:
 *           type: string
 *           enum: 
 *             - rock
 *             - pop
 * 
 *           description: The genre of the music track.
 *         release_date:
 *           type: string
 *           format: date-time
 *           description: The release date of the music track in ISO 8601 format.
 *         duration:
 *           type: number
 *           description: The duration of the music track in seconds.
 *         url:
 *           type: string
 *           format: uri
 *           description: The URL of the music track, represented as a Data URI.
 */
export class EditMusicTrackDTO {
    constructor(data: Partial<EditMusicTrackDTO>) {
        Object.assign(this, data)
    }

    @IsOptional()
    @IsString()
    track_title?: string

    @IsOptional()
    @IsArray()
    artists!: string[]

    @IsOptional()
    @IsEnum(PlaylistGenre)
    genre!: PlaylistGenre

    @IsOptional()
    @IsDateString()
    release_date!: Date

    @IsOptional()
    @IsNumber()
    duration!: number

    @IsOptional()
    @IsDataURI()
    url!: string
}