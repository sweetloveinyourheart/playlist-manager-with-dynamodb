import { NextFunction, Request, Response } from "express";
import { ValidateBody } from "../decorators/validate-body.decorator";
import { ArtistRegisterDTO, EditArtistDTO } from "../dtos/artist.dto";
import ArtistService from "../services/artist.service";
import { AuthGuard } from "../decorators/auth-guard.decorator";

const artistService = new ArtistService()

export default class ArtistController {

    @AuthGuard()
    @ValidateBody(ArtistRegisterDTO)
    async registerNewArtist(request: Request, response: Response, next: NextFunction) {
        try {
            const newArtist: ArtistRegisterDTO = request.body
            const result = await artistService.artistRegister(newArtist)

            return response.status(201).json({ success: result })
        } catch (error) {
            next(error)
        }
    }

    @AuthGuard()
    @ValidateBody(EditArtistDTO)
    async updateUserProfile(request: Request, response: Response, next: NextFunction) {
        try {
            const artist_id = request.query['artist_id'] as string
            const updateData: EditArtistDTO = request.body

            const profile = await artistService.editArtistInfo(artist_id, updateData)

            return response.status(200).json(profile)
        } catch (error) {
            next(error)
        }
    }
}