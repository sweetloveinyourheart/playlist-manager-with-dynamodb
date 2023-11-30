import dynamoose, { Schema } from "dynamoose";
import { User, UserSchema } from "./user.model";
import { MusicTrack, MusicTrackSchema } from "./music-track.model";
import { Item } from "dynamoose/dist/Item";

export class UserPlaylist extends Item {
    playlist_id!: string
    user!: User
    tracks!: MusicTrack
    playlist_name!: string
}

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
    tracks: {
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
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const UserPlaylistModel = dynamoose.model<UserPlaylist>('user-playlist', UserPlaylistSchema)
export default UserPlaylist
