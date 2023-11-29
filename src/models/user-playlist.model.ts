import { Schema } from "dynamoose";
import { UserSchema } from "./user.model";
import { MusicTrackSchema } from "./music-track.model";

export const UserPlaylistSchema = new Schema({
    playlist_id: {
        type: String,
        hashKey: true
    },
    user: {
        type: Set,
        schema: [UserSchema],
        rangeKey: true,
        required: true
    },
    track_ids: {
        type: Array,
        schema: [{ 
            type: Set,
            schema: [MusicTrackSchema]
        }],
        default: []
    },
    playlist_name: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "createDate",
        updatedAt: undefined // updatedAt will not be stored as part of the timestamp
    }
})