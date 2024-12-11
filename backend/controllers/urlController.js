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
      res.status(400).json({ message: "URL already exists" });
      return
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

export const getShortUrls = asyncHandler(async (req, res) => {
    try {
      await Url.deleteMany({ experationDate: { $lte: new Date() } });
  
      const urls = await Url.find();
  
      res.status(200).json(urls);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
      throw new Error(error.message);
    }
});

export const redirectUrlandIncreaseClickCount = asyncHandler(async (req, res) => {
    const { urlId } = req.params;

    try {
        const existingUrl = await Url.findOne({ urlId });

        if (existingUrl === null) {
            res.status(404).json({ message: "URL not found" });            
            return
        }

        if (existingUrl.experationDate && new Date() > existingUrl.experationDate) {
            res.status(410).json({ message: "Shortened URL has expired" });
            return
        }

        await Url.findByIdAndUpdate(existingUrl._id, { $inc: { "clicks": 1 } });

        return res.status(200).redirect(existingUrl.url);
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        throw new Error(error.message);
    }
});

export const deleteShortUrl = asyncHandler(async (req, res) => {
    const { shortUrl } = req.body;

    try {
        const deleteUrl = await Url.deleteOne({ shortUrl });

        if (deleteUrl.deletedCount === 0) {
            res.status(404).json({ message: "URL not found" });
            return
        }

        res.status(200).json({ message: "URL deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        throw new Error(error.message);
    }
});