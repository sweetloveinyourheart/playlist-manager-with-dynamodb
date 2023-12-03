import { describe, expect, test } from '@jest/globals';
import UserService from '../../src/services/user.service'
import { CreateNewUserDTO } from '../../src/dtos/user.dto';
import AccountModel, { Account } from '../../src/models/account.model';
import bcrypt from 'bcrypt'
import UserModel from '../../src/models/user.model';
import { BadRequestException } from '../../src/exceptions/bad-request.exception';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../../src/exceptions/unauthorized.exception';
import { JWT_SECRET } from '../../src/configs/variables.config';
import { NotFoundException } from '../../src/exceptions/not-found.exception';

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createUser', () => {
        const mockNewUserData: CreateNewUserDTO = {
            email: 'testuser@gmail.com',
            password: 'testpassword',
            first_name: 'first',
            last_name: 'last'
        };

        test('should create a new user', async () => {
            const mockExistedAccounts: any[] = [];

            const mockSalt = 'mockSalt';
            const mockHashedPassword = 'mockHashedPassword';
            const mockNewUser = { user_id: 'mockUserId' };
            const mockNewAccount = { email: 'testuser', password: 'mockHashedPassword', user: mockNewUser };

            jest.spyOn(AccountModel, 'query').mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockExistedAccounts)
            } as any)

            const mockGenSalt = jest.fn().mockResolvedValue(mockSalt)
            bcrypt.genSalt = mockGenSalt

            const mockHash = jest.fn().mockResolvedValue(mockHashedPassword)
            bcrypt.hash = mockHash

            const mockUserCreate = jest.fn().mockResolvedValue(mockNewUser)
            UserModel.create = mockUserCreate

            const mockAccountModel = jest.fn().mockResolvedValue(mockNewAccount)
            AccountModel.create = mockAccountModel

            const result = await userService.createUser(mockNewUserData);

            expect(AccountModel.query).toHaveBeenCalledWith({ email: 'testuser@gmail.com' });
            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', mockSalt);
            expect(UserModel.create).toHaveBeenCalledWith({ user_id: expect.any(String), first_name: mockNewUserData.first_name, last_name: mockNewUserData.last_name });
            expect(AccountModel.create).toHaveBeenCalledWith({ email: 'testuser@gmail.com', password: mockHashedPassword, user: mockNewUser });
            expect(result).toEqual(true);
        });

        test('should throw BadRequestException if user already exists', async () => {
            const mockExistedAccounts = [{ email: 'existinguser@gmail.com', user: "abc" }];

            const mockQuery = jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockExistedAccounts)
            } as any)
            AccountModel.query = mockQuery

            await expect(userService.createUser(mockNewUserData)).rejects.toThrowError(BadRequestException);
        });
    });

    describe('userLogin', () => {
        test('should generate tokens and return them on successful login', async () => {
            const userLogin = {
                email: 'existinguser@gmail.com',
                password: 'validpassword',
            };

            const mockAccount = {
                email: 'existinguser@gmail.com',
                password: '$2b$10$mockhash', // Mocked hashed password
                user: {
                    user_id: 'mockuserid',
                },
                populate: jest.fn().mockResolvedValue({
                    user: {
                        user_id: 'mockuserid',
                    },
                })
            };

            const mockQuery = jest.fn().mockResolvedValue(mockAccount);
            AccountModel.get = mockQuery;

            const mockCompare = jest.fn().mockResolvedValue(true);
            bcrypt.compare = mockCompare;

            const mockSign = jest.fn().mockReturnValue('mockedtoken');
            jwt.sign = mockSign

            const result = await userService.userLogin(userLogin);

            expect(mockQuery).toHaveBeenCalledWith(userLogin.email);
            expect(mockCompare).toHaveBeenCalledWith(userLogin.password, mockAccount.password);
            expect(result).toEqual({
                accessToken: 'mockedtoken',
                refreshToken: 'mockedtoken'
            });

        });

        test('should throw UnauthorizedException if email or password is not valid', async () => {
            const userLogin = {
                email: 'existinguser@gmail.com',
                password: 'validpassword',
            };

            const mockAccount = {
                email: 'existinguser@gmail.com',
                password: '$2b$10$mockhash', // Mocked hashed password
                user: {
                    user_id: 'mockuserid',
                },
                populate: jest.fn().mockResolvedValue({
                    user: {
                        user_id: 'mockuserid',
                    },
                })
            };

            const mockQuery = jest.fn().mockResolvedValue(mockAccount);
            AccountModel.get = mockQuery

            const mockCompare = jest.fn().mockResolvedValue(false);
            bcrypt.compare = mockCompare

            await expect(userService.userLogin(userLogin)).rejects.toThrowError(UnauthorizedException)
        })


    });

    describe('refreshToken', () => {
        test('should generate tokens with provided authUser', async () => {
            const mockAuthUser = { user_id: 'mockuserid', email: 'mockuser@gmail.com' };
            const mockSign = jest.fn().mockReturnValue('mockedtoken');
            jwt.sign = mockSign

            const mockDecode = jest.fn().mockReturnValue(mockAuthUser)
            jwt.decode = mockDecode

            const result = await userService.refreshNewToken('refresh-token');

            expect(mockSign).toHaveBeenCalledWith(
                mockAuthUser,
                JWT_SECRET, // Replace with your actual secret key
                { expiresIn: '15m' }
            );
            expect(result).toEqual({
                accessToken: 'mockedtoken'
            });
        });

        test('should throw UnauthorizedException when authUser is not provided', async () => {
            const mockDecode = jest.fn().mockReturnValue(null)
            jwt.decode = mockDecode

            await expect(userService.refreshNewToken('refresh-token')).rejects.toThrowError(UnauthorizedException);
        });
    })

    describe('getUserProfile', () => {
        test('should return user with the provided user_id', async () => {
            const mockUserId = 'mockuserid';
            const mockUser = { user_id: mockUserId, email: 'mockuser' };
            const mockGet = jest.fn().mockResolvedValue(mockUser);
            UserModel.get = mockGet;

            const result = await userService.getUserProfile(mockUserId);

            expect(mockGet).toHaveBeenCalledWith(mockUserId);
            expect(result).toEqual(mockUser);
        });

        test('should throw NotFoundException when user is not found', async () => {
            const mockUserId = 'nonexistentuserid';
            const mockGet = jest.fn().mockResolvedValue(undefined);
            UserModel.get = mockGet;

            await expect(userService.getUserProfile(mockUserId)).rejects.toThrowError(NotFoundException);

            // Ensure get was called with the correct parameters
            expect(mockGet).toHaveBeenCalledWith(mockUserId);
        });
    })

    describe('updateUserProfile', () => {
        const mockUpdateData = { first_name: 'name' }

        test('should return user when update user profile successfully', async () => {
            const mockUserId = 'mockuserid';
            const mockUser = { user_id: mockUserId, email: 'mockuser' };
            const mockGet = jest.fn().mockResolvedValue(mockUser);
            UserModel.get = mockGet;

            const mockUpdate = jest.fn().mockResolvedValue(mockUpdateData);
            UserModel.update = mockUpdate

            const result = await userService.updateUserProfile(mockUserId, mockUpdateData);

            expect(mockGet).toHaveBeenCalledWith(mockUserId);
            expect(result).toEqual(mockUpdateData);
        });

        test('should throw NotFoundException when user is not found', async () => {
            const mockUserId = 'nonexistentuserid';
            const mockGet = jest.fn().mockResolvedValue(undefined);
            UserModel.get = mockGet;

            await expect(userService.updateUserProfile(mockUserId, mockUpdateData)).rejects.toThrowError(NotFoundException);

            // Ensure get was called with the correct parameters
            expect(mockGet).toHaveBeenCalledWith(mockUserId);
        });
    })
});