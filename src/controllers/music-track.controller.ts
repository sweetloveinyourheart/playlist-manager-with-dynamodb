import { NextFunction, Request, Response } from "express";
import { AuthGuard } from "../decorators/auth-guard.decorator";
import { RolesGuard } from "../decorators/role-guard.decorator";
import { Role } from "../models/account.model";
import { EditMusicTrackDTO, NewMusicTrackDTO } from "../dtos/music-track.dto";
import MusicTrackService from "../services/music-track.service";
import { ValidateBody } from "../decorators/validate-body.decorator";

const musicTrackService = new MusicTrackService()

export default class MusicTrackController {

    @AuthGuard()
    @RolesGuard(Role.Admin)
    @ValidateBody(NewMusicTrackDTO)
    async createNewMusicTrack(request: Request, response: Response, next: NextFunction) {
        try {
            const newMusicTrack: NewMusicTrackDTO = request.body
            const result = await musicTrackService.createNewMusicTrack(newMusicTrack)
            return response.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    @AuthGuard()
    @RolesGuard(Role.Admin)
    @ValidateBody(EditMusicTrackDTO)
    async editMusicTrack(request: Request, response: Response, next: NextFunction) {
        try {
            const track_id = request.query['track_id'] as string

            const newMusicTrack: EditMusicTrackDTO = request.body
            const result = await musicTrackService.editMusicTrack(track_id, newMusicTrack)
            return response.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    @AuthGuard()
    @RolesGuard(Role.Admin)
    @ValidateBody(EditMusicTrackDTO)
    async removeMusicTrack(request: Request, response: Response, next: NextFunction) {
        try {
            const track_id = request.query['track_id'] as string
            const result = await musicTrackService.removeMusicTrack(track_id)
            return response.status(200).json({ success: result })
        } catch (error) {
            next(error)
        }
    }

}