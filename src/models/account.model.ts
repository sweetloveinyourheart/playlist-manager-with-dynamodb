import dynamoose, { Schema } from "dynamoose";
import { Item } from "dynamoose/dist/Item";
import UserModel, { User } from "./user.model";

export enum Role {
    Admin = "admin",
    Manager = "manager",
    User = "user"
}

export class Account extends Item {
    email!: string
    password!: string
    user!: User | string
    role!: Role
    created_at!: string
    updated_at!: string
}

export const AccountSchema = new Schema({
    email: {
        type: String,
        hashKey: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user: {
        type: UserModel,
        schema: UserModel,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.User  
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const AccountModel = dynamoose.model<Account>('account', AccountSchema)
export default AccountModel