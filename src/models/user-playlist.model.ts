import dynamoose, { Schema } from "dynamoose";
import UserModel, { User } from "./user.model";
import MusicTrackModel, { MusicTrack } from "./music-track.model";
import { Item } from "dynamoose/dist/Item";

export class UserPlaylist extends Item {
    playlist_id!: string
    user!: User | string
    tracks!: MusicTrack
    playlist_name!: string
}

export const UserPlaylistSchema = new Schema({
    playlist_id: {
        type: String,
        hashKey: true
    },
    user: {
        type: UserModel,
        schema: UserModel,
        rangeKey: true,
        required: true
    },
    tracks: {
        type: Array,
        schema: [{
            type: Set,
            schema: [MusicTrackModel]
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
export default UserPlaylistModel
