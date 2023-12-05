import { describe, expect, test } from '@jest/globals';
import ArtistService from '../../src/services/artist.service'
import ArtistModel from '../../src/models/artist.model';
import { ArtistRegisterDTO, EditArtistDTO } from '../../src/dtos/artist.dto';
import { NotFoundException } from '../../src/exceptions/not-found.exception';

describe('ArtistService', () => {
    let artistService: ArtistService;

    beforeEach(() => {
        artistService = new ArtistService();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('artistRegister', () => {
        it('should create new artist', async () => {
            const artist: ArtistRegisterDTO = {
                artist_name: "artist"
            }

            const mockArtistCreate = jest.fn().mockResolvedValue(artist)
            ArtistModel.create = mockArtistCreate

            const result = await artistService.artistRegister(artist)

            expect(ArtistModel.create).toHaveBeenCalledWith({ ...artist, artist_id: expect.any(String) })
            expect(result).toBe(artist)
        })
    })

    describe('editArtistInfo', () => {
        it('should throw error when no artist found with given id', async () => {
            const artist_id = "id"
            const artist: EditArtistDTO = {
                artist_name: "artist"
            }

            const mockArtistGet = jest.fn().mockResolvedValue(null)
            ArtistModel.get = mockArtistGet

            await expect(artistService.editArtistInfo(artist_id, artist)).rejects.toThrowError(NotFoundException)
        })

        it('should throw error when no artist found with given id', async () => {
            const artist_id = "id"
            const artist: EditArtistDTO = {
                artist_name: "artist"
            }

            const mockArtistGet = jest.fn().mockResolvedValue(artist)
            ArtistModel.get = mockArtistGet

            const mockArtistUpdate = jest.fn().mockResolvedValue(artist)
            ArtistModel.update = mockArtistUpdate

            const result = await artistService.editArtistInfo(artist_id, artist)

            expect(result).toBe(artist)
        })
    })
})