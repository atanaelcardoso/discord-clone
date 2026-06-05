import  Router from "express";
import  UsersController  from "../Controllers/Users.controlles.js";

const router = Router();
const usersController = new UsersController();

router.get('/users', usersController.get);

export default router;