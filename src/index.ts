import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { userModel } from './models/user.model';
import bcrypt from 'bcrypt';
import { body, param, validationResult } from 'express-validator'
import { errorMiddleware } from './middlewares/errorHander.middleware';
import { passwordReqValidationSchema, usernameParamValidationSchema } from './util/validationSchema';
import userRegisterRouter from './routes/user/register.route';
import userPasswordRouter from './routes/user/password.route';
import userDeleteRouter from './routes/user/delete.route';
import userGetRouter from './routes/user/user.route';

const app = express();
app.use(express.json());

app.use(userGetRouter);
app.use(userRegisterRouter);
app.use(userPasswordRouter);
app.use(userDeleteRouter);

app.listen(8080, async () => {
    console.log('Listening on port 8080');
    try {
        await mongoose.connect('mongodb://localhost:27017/mongotest');
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
    }
});