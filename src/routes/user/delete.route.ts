import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { errorMiddleware } from "../../middlewares/errorHander.middleware";
import { userModel } from "../../models/user.model";
import bcrypt from 'bcrypt';
import { usernameParamValidationSchema, passwordReqValidationSchema } from "../../util/validationSchema";

const userDeleteRouter = Router();

userDeleteRouter.delete('/u/:username/delete', usernameParamValidationSchema('username'), passwordReqValidationSchema('password'), errorMiddleware, async (req: Request, res: Response) => {
    const { username } = req.params;
    const { password } = req.body;

    const userDoc = await userModel.findOne({ username });
    if (!userDoc) return res.status(400).send({ error: "User not found" });

    const currPassValid = await bcrypt.compare(password, userDoc.password);
    if(!currPassValid) return res.status(400).send({ error: "Password does not match"});

    await userDoc.delete();
    return res.status(200).send({ message: `User: "${username}" was deleted` })
});

export default userDeleteRouter;