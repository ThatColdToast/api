import { model, Schema } from "mongoose";

interface User { username: string, password: string };

const userSchema = new Schema<User> (
    {
        username: {type: String, required: true},
        password: {type: String, required: true}
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = doc._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
            }
        }
    }
);

export const userModel = model<User> ('User', userSchema);