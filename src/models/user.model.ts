import dynamoose, { Schema } from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: The unique identifier for the user.
 *         first_name:
 *           type: string
 *           description: The first name of the user.
 *         last_name:
 *           type: string
 *           description: The last name of the user.
 *         address:
 *           type: string
 *           description: The address of the user (optional).
 *         gender:
 *           type: string
 *           enum: [ "Male", "Female", "Other" ]
 *           description: The gender of the user.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated.
 *       required:
 *         - user_id
 *         - first_name
 *         - last_name
 *         - created_at
 *         - updated_at
 */
export class User extends Item {
    user_id!: string
    first_name!: string
    last_name!: string
    address?: string
    gender?: Gender
    created_at!: Date
    updated_at!: Date 
}

export const UserSchema = new Schema({
    user_id: {
        type: String,
        hashKey: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: Object.values(Gender)
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const UserModel = dynamoose.model<User>("user", UserSchema)
export default UserModel