import { Request, Response, Router } from "express";
import { errorMiddleware } from "../../middlewares/errorHander.middleware";
import { userModel } from "../../models/user.model";
import { passwordReqValidationSchema, usernameParamValidationSchema } from "../../util/validationSchema";
import bcrypt from 'bcrypt';

const userPasswordRouter = Router();

const passwordUpdateSchema = [ // 'Length must be between 3 and 20 characters'
    passwordReqValidationSchema('currentPassword'),
    passwordReqValidationSchema('newPassword')
];

userPasswordRouter.patch('/u/:username/password', usernameParamValidationSchema('username'), passwordUpdateSchema, errorMiddleware, async (req: Request, res: Response) => {
    const { username } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    const userDoc = await userModel.findOne({ username });
    if (!userDoc) return res.status(400).send({ error: "User not found" });

    const currPassValid = await bcrypt.compare(currentPassword, userDoc.password);
    if(!currPassValid) return res.status(400).send({ error: "Password does not match"});

    userDoc.password = await bcrypt.hash(newPassword, 13);
    await userDoc.save();
    return res.status(200).send({ message: 'Password Updated' });
});

export default userPasswordRouter;