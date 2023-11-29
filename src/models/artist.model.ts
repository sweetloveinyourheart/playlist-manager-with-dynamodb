import { Schema } from "dynamoose";

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
})