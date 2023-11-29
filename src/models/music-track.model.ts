import dynamoose, { Schema } from 'dynamoose'
import { ArtistSchema } from './artist.model'

enum PlaylistGenre {
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
        schema: [ArtistSchema],
        required: true
    },
    genre: {
        type: String,
        enum: Object.values(PlaylistGenre),
        required: true
    },
    release_date: {
        type: Date,
        required: true
    }, 
    duration: {
        type: Number
    },
    url: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createDate",
        updatedAt: undefined // updatedAt will not be stored as part of the timestamp
    }
}) 

