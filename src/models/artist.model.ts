import dynamoose, { Schema } from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export class Artist extends Item {
    artist_id!: string
    artist_name!: string
    country?: string
    genre?: string
    created_at!: Date
    updated_at!: Date
}

enum ArtistGenre {
    Pop = "pop",
    Ballad = "ballad"
}

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