import { EditMusicTrackDTO, NewMusicTrackDTO } from '../../src/dtos/music-track.dto';
import { BadRequestException } from '../../src/exceptions/bad-request.exception';
import MusicTrackModel, { PlaylistGenre } from '../../src/models/music-track.model';
import MusicTrackService from '../../src/services/music-track.service' 

describe('MusicTrackService', () => {
  let musicTrackService: MusicTrackService;

  beforeEach(() => {
    // Initialize a new instance of the MusicTrackService before each test
    musicTrackService = new MusicTrackService();
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createNewMusicTrack', () => {
    const newTrackData: NewMusicTrackDTO = {
        url: 'url',
        artists: ['1', '2'],
        duration: 12,
        genre: PlaylistGenre.Pop,
        release_date: '2023-12-09',
        track_title: 'awesome track'

    }

    it('should create a new music track successfully', async () => {
      // Mock the MusicTrackModel.create method to return a fake result
      const fakeNewMusicTrack = { track_title: 'awesome track' };

      const mockMusicTrackCreate = jest.fn();
      (MusicTrackModel.create = mockMusicTrackCreate as jest.Mock).mockResolvedValue(fakeNewMusicTrack);

      // Call the function and assert the result
      const result = await musicTrackService.createNewMusicTrack(newTrackData);
      expect(result).toEqual(fakeNewMusicTrack);
    });

    it('should throw BadRequestException on error', async () => {
      // Mock the MusicTrackModel.create method to throw an error
      const mockMusicTrackCreate = jest.fn();
      (MusicTrackModel.create = mockMusicTrackCreate as jest.Mock).mockRejectedValue(new Error('Mocked error'));

      // Call the function and expect it to throw BadRequestException
      await expect(
        musicTrackService.createNewMusicTrack(newTrackData)
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('editMusicTrack', () => {
    const editTrackData: EditMusicTrackDTO = {
        url: 'url',
        track_title: 'awesome track'
    }

    it('should edit a music track successfully', async () => {
      // Mock the MusicTrackModel.update method to return a fake result
      const fakeUpdatedTrack = {track_title: 'awesome track' };

      const mockMusicTrackGet = jest.fn();
      (MusicTrackModel.get = mockMusicTrackGet as jest.Mock).mockResolvedValue({ id: 'track_id' })
      const mockMusicTrackUpdate = jest.fn();
      (MusicTrackModel.update = mockMusicTrackUpdate as jest.Mock).mockResolvedValue(fakeUpdatedTrack);

      // Call the function and assert the result
      const result = await musicTrackService.editMusicTrack('track_id', editTrackData);
      expect(result).toEqual(fakeUpdatedTrack);
    });

    it('should throw BadRequestException on error', async () => {
      const mockMusicTrackGet = jest.fn();
      (MusicTrackModel.get = mockMusicTrackGet as jest.Mock).mockResolvedValue({ id: 'track_id' })
      // Mock the MusicTrackModel.update method to throw an error
      const mockMusicTrackUpdate = jest.fn();
      (MusicTrackModel.update = mockMusicTrackUpdate as jest.Mock).mockRejectedValue(new Error('Mocked error'));

      // Call the function and expect it to throw BadRequestException
      await expect(
        musicTrackService.editMusicTrack('track_id', editTrackData)
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('removeMusicTrack', () => {
    it('should remove a music track successfully', async () => {
      const mockMusicTrackGet = jest.fn();
      (MusicTrackModel.get = mockMusicTrackGet as jest.Mock).mockResolvedValue({ id: 'track_id' })
      // Mock the MusicTrackModel.delete method to return a fake result
      const mockMusicTrackDelete = jest.fn();
      (MusicTrackModel.delete = mockMusicTrackDelete as jest.Mock).mockResolvedValue({});

      // Call the function and assert the result
      const result = await musicTrackService.removeMusicTrack('track_id');
      expect(result).toBe(true);
    });

    it('should throw BadRequestException on error', async () => {
      const mockMusicTrackGet = jest.fn();
      (MusicTrackModel.get = mockMusicTrackGet as jest.Mock).mockResolvedValue({ id: 'track_id' })
      // Mock the MusicTrackModel.delete method to throw an error
      const mockMusicTrackDelete = jest.fn();
      (MusicTrackModel.delete = mockMusicTrackDelete as jest.Mock).mockRejectedValue(new Error('Mocked error'));

      // Call the function and expect it to throw BadRequestException
      await expect(
        musicTrackService.removeMusicTrack('track_id')
      ).rejects.toThrow(BadRequestException);
    });
  });
});
