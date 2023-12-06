import dynamoose, { Schema } from 'dynamoose'
import ArtistModel, { Artist } from './artist.model'
import { Item } from 'dynamoose/dist/Item'

/**
 * @swagger
 * components:
 *   schemas:
 *     MusicTrack:
 *       type: object
 *       properties:
 *         track_id:
 *           type: string
 *           description: The unique identifier for the music track.
 *         track_title:
 *           type: string
 *           description: The title of the music track.
 *         artist:
 *           $ref: '#/components/schemas/Artist'
 *           description: The artist associated with the music track.
 *         genre:
 *           $ref: '#/components/schemas/PlaylistGenre'
 *           description: The genre of the music track.
 *         release_date:
 *           type: string
 *           format: date
 *           description: The release date of the music track.
 *         duration:
 *           type: number
 *           description: The duration of the music track in seconds.
 *         url:
 *           type: string
 *           format: uri
 *           description: The URL or link to the music track.
 *       required:
 *         - track_id
 *         - track_title
 *         - artist
 *         - genre
 *         - release_date
 *         - duration
 *         - url
 */
export class MusicTrack extends Item {
    track_id!: string
    track_title!: string
    artist!: Artist
    genre!: PlaylistGenre
    release_date!: Date
    duration!: number
    url!: string
}

export enum PlaylistGenre {
    Pop = "pop",
    Rock = "rock",
    Rap = "rap",
    Ballad = "ballad"
}

export const MusicTrackSchema = new Schema({
    track_id: {
        type: String,
        hashKey: true
    },
    track_title: {
        type: String,
        required: true
    },
    artist: {
        type: Set,
        schema: [ArtistModel],
        required: true
    },
    genre: {
        type: String,
        enum: Object.values(PlaylistGenre),
        required: true
    },
    release_date: {
        type: Date,
        rangeKey: true,
        required: true
    }, 
    duration: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
}) 

const MusicTrackModel = dynamoose.model<MusicTrack>('music-track', MusicTrackSchema)
export default MusicTrackModel
