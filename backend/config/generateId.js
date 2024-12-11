import { nanoid } from 'nanoid';
import Url from '../models/urlModel.js';

export const generateUniqueUrlId = async () => {
  let urlId;
  let isUnique = false;

  while (!isUnique) {
    urlId = nanoid(8);
    const urlExists = await Url.findOne({ urlId });
    if (!urlExists) {
      isUnique = true;
    }
  }

  return urlId;
};
