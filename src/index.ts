import express from 'express';
import userRegisterRouter from './routes/user/register.route';
import userPasswordRouter from './routes/user/password.route';
import userDeleteRouter from './routes/user/delete.route';
import userGetRouter from './routes/user/user.route';
import { Sequelize } from 'sequelize';

const app = express();
app.use(express.json());

export const sqlize = new Sequelize('postgres://admin:secure3@localhost:5432/userdata_test');

app.use(userGetRouter);
app.use(userRegisterRouter);
app.use(userPasswordRouter);
app.use(userDeleteRouter);

app.listen(8080, async () => {
    console.log('Listening on port 8080');
    try {
        await sqlize.authenticate();
        console.log('Postgres connected');
    } catch (error) {
        console.error(error);
    }
});