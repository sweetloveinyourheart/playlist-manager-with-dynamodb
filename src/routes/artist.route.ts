import { Router } from "express";
import ArtistController from "../controllers/artist.controller";


const routes = Router()

const artistController = new ArtistController()


/**
 * @swagger
 * /artist/new:
 *   post:
 *     summary: Register a new artist
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Artist
 *     requestBody:
 *       description: Artist registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtistRegisterDTO'
 *     responses:
 *       '200':
 *         description: Successful registration
 *         content:
 *           application/json:
 *             example:
 *               message: Artist successfully registered
 *       '400':
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
routes.post('/new', artistController.registerNewArtist)


/**
 * @swagger
 * /artist/edit:
 *   put:
 *     summary: Update artist information
 *     parameters:
 *       - name: artist_id
 *         in: query
 *         description: The refresh token to renew the user's session.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Artist
 *     requestBody:
 *       description: Artist information to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditArtistDTO'
 *     responses:
 *       '200':
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               message: Artist information updated successfully
 *       '400':
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *       '404':
 *         description: Artist not found
 *         content:
 *           application/json:
 *             example:
 *               error: Artist not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

routes.put('/edit', artistController.updateArtistInfo)

export default routes
