import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { errorMiddleware } from "../../middlewares/errorHander.middleware";
import { userModel } from "../../models/user.model";
import bcrypt from 'bcrypt';
import { usernameReqValidationSchema, passwordReqValidationSchema } from "../../util/validationSchema";

const userRegisterRouter = Router();

const registrationSchema = [usernameReqValidationSchema('username'), passwordReqValidationSchema('password')];

userRegisterRouter.post('/register', registrationSchema, errorMiddleware, async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const userDoc = await userModel.findOne({ where: { username } });
    if (userDoc) return res.status(400).send({ error: "Username already used" });

    const hashedPass = await bcrypt.hash(password, 13);
    await userModel.create({username, password: hashedPass});
    return res.status(201).send({username});
});

export default userRegisterRouter;