import dynamoose, { Schema } from "dynamoose";
import { Item } from "dynamoose/dist/Item";
import { User, UserSchema } from "./user.model";

export class Account extends Item {
    username!: string
    password!: string
    user!: User
    created_at!: string
    updated_at!: string
}

export const AccountSchema = new Schema({
    username: {
        type: String,
        hashKey: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user: {
        type: Set,
        schema: [UserSchema],
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const AccountModel = dynamoose.model<Account>('account', AccountSchema)
export default AccountModel