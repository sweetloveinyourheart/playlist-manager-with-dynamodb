import { EditMusicTrackDTO, NewMusicTrackDTO } from "../dtos/music-track.dto";
import { BadRequestException } from "../exceptions/bad-request.exception";
import { NotFoundException } from "../exceptions/not-found.exception";
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
            const track = await MusicTrackModel.get({ track_id })
            if (!track) throw new NotFoundException('No track found !')

            const updatedTrack = await MusicTrackModel.update({ track_id }, trackData)

            return updatedTrack
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }

    async removeMusicTrack(track_id: string) {
        try {
            const track = await MusicTrackModel.get({ track_id })
            if (!track) throw new NotFoundException('No track found !')

            await MusicTrackModel.delete(track_id)

            return true
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }
}