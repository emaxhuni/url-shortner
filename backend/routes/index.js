import express from 'express'
import urlRoute from './urlRoute.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, this is the API root!');
});

router.use('/url', urlRoute);

export default router