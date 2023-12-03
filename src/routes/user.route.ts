import { Router } from "express";
import UserController from "../controllers/user.controller";

const routes = Router()
const userController = new UserController()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 * /user/register:
 *   post:
 *     summary: Register new account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNewUserDTO'
 *     responses:
 *       201:
 *         description: Create result in message.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                   success:
 *                      type: boolean
 *                      description: response status
 *                      example: true
 *
 */
routes.post('/register', userController.register)

/**
 * @swagger
 * /user/sign-in:
 *   post:
 *     summary: Sign in a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginDTO'
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, incorrect credentials
 *       500:
 *         description: Internal Server Error
 */
routes.post('/sign-in', userController.login)

/**
 * @swagger
 * /user/refresh-token:
 *   get:
 *     summary: Refresh new token
 *     tags:
 *       - User
 *     parameters:
 *       - name: refresh-token
 *         in: query
 *         description: The refresh token to renew the user's session.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful refresh token
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, incorrect credentials
 *       500:
 *         description: Internal Server Error
 */
routes.get('/refresh-token', userController.refreshToken)

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User info
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, incorrect credentials
 *       500:
 *         description: Internal Server Error
 */
routes.get('/profile', userController.getUserProfile)


/**
 * @swagger
 * /user/update-profile:
 *   put:
 *     summary: Update user' profile
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDTO'
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, incorrect credentials
 *       500:
 *         description: Internal Server Error
 */
routes.put('/update-profile', userController.updateUserProfile)

export default routes