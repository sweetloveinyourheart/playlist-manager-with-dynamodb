import { ArtistRegisterDTO, EditArtistDTO } from "../dtos/artist.dto";
import { NotFoundException } from "../exceptions/not-found.exception";
import ArtistModel from "../models/artist.model";
import { v4 as uuidv4 } from 'uuid'

export default class ArtistService {

    async artistRegister(artistInfo: ArtistRegisterDTO) {
        const newArtist = await ArtistModel.create({
            ...artistInfo,
            artist_id: uuidv4()
        })
        
        return newArtist
    }

    async editArtistInfo(artist_id: string, artistInfo: EditArtistDTO) {
        const artist = await ArtistModel.get(artist_id)
        if (!artist) throw new NotFoundException('No artist found !')

        return await ArtistModel.update(artist_id, artistInfo)
    }

}