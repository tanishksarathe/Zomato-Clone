import express from 'express';
import { contactUsController } from '../controllers/publicController.js';

const route = express.Router();

route.post("/contactus", contactUsController);

export default route;