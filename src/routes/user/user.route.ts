import { Request, Response, Router } from "express";
import { errorMiddleware } from "../../middlewares/errorHander.middleware";
import { userModel } from "../../models/user.model";
import { usernameParamValidationSchema } from "../../util/validationSchema";


const userGetRouter = Router();

userGetRouter.get('/u/:username', usernameParamValidationSchema('username'), errorMiddleware, async (req: Request, res: Response) => {
    const { username } = req.params;
    const userDoc = await userModel.findOne({ username });
    if (!userDoc) return res.status(400).send({ error: "User not found" });
    
    return res.status(200).send({ username: userDoc.username });
});

export default userGetRouter;