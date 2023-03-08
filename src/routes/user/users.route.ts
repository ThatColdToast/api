import { Request, Response, Router } from "express";
import { errorMiddleware } from "../../middlewares/errorHander.middleware";
import { userModel } from "../../models/user.model";


const userGetAllRouter = Router();

userGetAllRouter.get('/users', errorMiddleware, async (req: Request, res: Response) => {
    const length = await userModel.count();
    if (length <= 0 || length >= 100) return res.status(400).send({ error: "Length is 0 or too large" });
    
    const userDocs = await userModel.find();
    if (!userDocs) return res.status(400).send({ error: "User not found" });

    return res.status(200).send({ usernames:  { userDocs }, length: length });
});

export default userGetAllRouter;