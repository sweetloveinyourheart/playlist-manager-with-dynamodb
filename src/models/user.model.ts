import { Schema } from "dynamoose";

enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
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
})