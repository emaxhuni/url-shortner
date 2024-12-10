import asyncHandler from "../middleware/asyncHandler.js";
import { validateUrl } from "../config/validUrl.js";
import Url from "../models/urlModel.js";
import { generateUniqueUrlId } from "../config/generateId.js";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { url, experationDate } = req.body;
  const clientUrl = process.env.BASE_URL;

  if (!validateUrl(url)) {
    res.status(400);
    throw new Error('Please add a valid URL');
  }

  try {
    const existingUrl = await Url.findOne({ url });

    if (existingUrl) {
      res.status(400);
      throw new Error("URL already exists");
    }

    const shortUrlUniqueId = await generateUniqueUrlId();

    const expiration = experationDate
      ? new Date(Date.now() + experationDate * 60 * 1000)
      : new Date(Date.now() + 60 * 60 * 1000);

    const newUrl = await Url.create({
      url,
      shortUrl: `${clientUrl}/${shortUrlUniqueId}`,
      urlId: shortUrlUniqueId,
      experationDate: expiration,
      date: new Date(),
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    throw new Error(error.message);
  }
});

