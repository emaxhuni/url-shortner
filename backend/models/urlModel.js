import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlId: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  experationDate: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 60 * 60 * 1000),
},
  date: {
    type: Date,
    required: true
  },
});

const Url = mongoose.model('Url', urlSchema);

export default Url;