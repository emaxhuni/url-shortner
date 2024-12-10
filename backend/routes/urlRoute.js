import express from 'express';
import { createShortUrl } from '../controllers/urlController.js';

const urlRoute = express.Router();

urlRoute.route("/").post(createShortUrl)

export default urlRoute