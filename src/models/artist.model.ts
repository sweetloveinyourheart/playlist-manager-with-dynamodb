import dynamoose, { Schema } from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export class Artist extends Item {
    artist_id!: string
    artist_name!: string
    country?: string
    genre?: ArtistGenre
    created_at!: Date
    updated_at!: Date
}

export enum ArtistGenre {
    Pop = "pop",
    Ballad = "ballad"
}


/**
 * @swagger
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       properties:
 *         artist_id:
 *           type: string
 *           description: The unique identifier for the artist.
 *         artist_name:
 *           type: string
 *           description: The name of the artist.
 *         country:
 *           type: string
 *           description: The country of the artist (optional).
 *         genre:
 *           type: string
 *           description: The genre of the artist (optional).
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the artist was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the artist was last updated.
 *       required:
 *         - artist_id
 *         - artist_name
 *         - created_at
 *         - updated_at
 */
export const ArtistSchema = new Schema({
    artist_id: {
        type: String,
        hashKey: true
    },
    artist_name: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    genre: {
        type: String,
        enum: Object.values(ArtistGenre)
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const ArtistModel = dynamoose.model<Artist>("artist", ArtistSchema)
export default ArtistModel