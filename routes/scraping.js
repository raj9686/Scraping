let express = require('express');
let router = express.Router();
let utils = require('../global/utils')
let constant = require('../global/constant')
let CacheService = require('../global/cache.service');

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

/* Post scraping listing. */
router.post('/', async function (req, res) {
    let url = req.body.url;
    if (url === undefined || url.length === 0)
        return res.send({error: constant.ERROR_URL_REQUIRED});
    // Valid url check
    if (utils.stringIsAValidUrl(url)) {
        return cache.get(url, async () => {
            // Getting html from url
            let html = await utils.getHTML(url);
            // Getting scrapped object and storing in response object
            return await utils.getScrappedObject(html);
        }).then((result) => {
            res.send(result);
        });
    } else
        //Error handle if url is invalid
        return res.send({error: constant.ERROR_INVALID_URL});
});


/* Get scraping listing. */
router.get('/', async function (req, res) {
    res.send("Welcome to scraper");
});



module.exports = router;
