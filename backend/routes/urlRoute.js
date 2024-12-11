import express from 'express';
import { createShortUrl, getShortUrls, redirectUrlandIncreaseClickCount, deleteShortUrl } from '../controllers/urlController.js';

const urlRoute = express.Router();

urlRoute.route("/").post(createShortUrl).get(getShortUrls).delete(deleteShortUrl);

urlRoute.route("/:urlId").get(redirectUrlandIncreaseClickCount);

export default urlRoute