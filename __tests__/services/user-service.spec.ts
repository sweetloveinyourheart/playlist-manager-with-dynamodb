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
            username: 'testuser',
            password: 'testpassword',
            first_name: 'first',
            last_name: 'last'
        };

        test('should create a new user', async () => {
            const mockExistedAccounts: any[] = [];

            const mockSalt = 'mockSalt';
            const mockHashedPassword = 'mockHashedPassword';
            const mockNewUser = { user_id: 'mockUserId' };
            const mockNewAccount = { username: 'testuser', password: 'mockHashedPassword', user: mockNewUser };

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

            expect(AccountModel.query).toHaveBeenCalledWith({ username: 'testuser' });
            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', mockSalt);
            expect(UserModel.create).toHaveBeenCalledWith({ user_id: expect.any(String), first_name: mockNewUserData.first_name, last_name: mockNewUserData.last_name });
            expect(AccountModel.create).toHaveBeenCalledWith({ username: 'testuser', password: mockHashedPassword, user: mockNewUser });
            expect(result).toEqual(true);
        });

        test('should throw BadRequestException if user already exists', async () => {
            const mockExistedAccounts = [{ username: 'existinguser', user: "abc" }];

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
                username: 'existinguser',
                password: 'validpassword',
            };

            const mockAccount = {
                username: 'existinguser',
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

            expect(mockQuery).toHaveBeenCalledWith(userLogin.username);
            expect(mockCompare).toHaveBeenCalledWith(userLogin.password, mockAccount.password);
            expect(result).toEqual({
                accessToken: 'mockedtoken',
                refreshToken: 'mockedtoken'
            });

        });

        test('should throw UnauthorizedException if username or password is not valid', async () => {
            const userLogin = {
                username: 'existinguser',
                password: 'validpassword',
            };

            const mockAccount = {
                username: 'existinguser',
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
            const mockAuthUser = { user_id: 'mockuserid', username: 'mockuser' };
            const mockSign = jest.fn().mockReturnValue('mockedtoken');
            jwt.sign = mockSign

            const result = await userService.refreshNewToken(mockAuthUser);

            expect(mockSign).toHaveBeenCalledWith(
                mockAuthUser,
                JWT_SECRET, // Replace with your actual secret key
                { expiresIn: '15m' }
            );
            expect(result).toEqual({
                accessToken: 'mockedtoken',
                refreshToken: 'mockedtoken', // Adjust this if needed
            });
        });

        test('should throw UnauthorizedException when authUser is not provided', async () => {
            await expect(userService.refreshNewToken()).rejects.toThrowError(UnauthorizedException);
        });
    })

    describe('getUserProfile', () => {
        test('should return user with the provided user_id', async () => {
            const mockUserId = 'mockuserid';
            const mockUser = { user_id: mockUserId, username: 'mockuser' };
            const mockGet = jest.fn().mockResolvedValue(mockUser);
            UserModel.get = mockGet;

            const result = await userService.getUserProfile(mockUserId);

            expect(mockGet).toHaveBeenCalledWith(mockUserId);
            expect(result).toEqual(mockUser);
        });

        test('should throw UnauthorizedException when user_id is not provided', async () => {
            await expect(userService.getUserProfile()).rejects.toThrowError(UnauthorizedException);
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
});