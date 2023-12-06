import { EditMusicTrackDTO, NewMusicTrackDTO } from "../dtos/music-track.dto";
import { BadRequestException } from "../exceptions/bad-request.exception";
import MusicTrackModel from "../models/music-track.model";
import { v4 as uuidv4 } from 'uuid'

export default class MusicTrackService {
    async createNewMusicTrack(newTrack: NewMusicTrackDTO) {
        try {
            const newMusicTrack = await MusicTrackModel.create({
                ...newTrack,
                track_id: uuidv4()
            })

            return newMusicTrack
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }

    async editMusicTrack(track_id: string, trackData: EditMusicTrackDTO) {
        try {
            const updatedTrack = await MusicTrackModel.update(track_id, trackData)
            return updatedTrack
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }

    async removeMusicTrack(track_id: string) {
        try {
            await MusicTrackModel.delete(track_id)
            return true
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }
}