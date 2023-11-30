import dynamoose, { Schema } from "dynamoose";
import { Item } from "dynamoose/dist/Item";

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

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