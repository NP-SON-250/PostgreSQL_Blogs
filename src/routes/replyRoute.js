import express from "express";
import fileUpload from "../helper/multer";
import { normalUserAuthentication } from "../middleware/Authentication";

import { 
    addReply,
    getAll,
    getReply,
    deleteReply,
 } from "../controller/replyController";

const replyRoute = express.Router();
replyRoute.post("/replies/add/:id",normalUserAuthentication,fileUpload.single("postImage"),addReply);
replyRoute.get("/replies/single/:id", getReply);
replyRoute.get("/replies/all", getAll);
replyRoute.delete("/replies/delete/:id",normalUserAuthentication,deleteReply);

export default replyRoute;