let axios = require('axios');
let cherrio = require('cheerio');
let URL = require("url").URL;

let utils = {}
// Getting html from url
utils.getHTML = async function (url) {
    const {data: html} = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
        }
    }).catch(function (error) {
        console.log(error);
    });
    return html;
}
// Getting scrapped object
utils.getScrappedObject = async function (html) {
    //create the response object
    const resObj = {};
    //create $ the object for html scraping
    const $ = await cherrio.load(html);
    const
        $title = $('head title').text(),
        $desc = $('meta[name="description"]').attr('content'),
        $ogTitle = $('meta[property="og:title"]').attr('content'),
        $ogImage = $('meta[property="og:image"]').attr('content'),
        $images = $('img');

    if ($title)
        resObj.title = $title;

    if ($desc)
        resObj.description = $desc;

    if ($ogImage && $ogImage.length)
        resObj.ogImage = $ogImage;

    if ($ogTitle && $ogTitle.length)
        resObj.ogTitle = $ogTitle;

    if ($images && $images.length) {
        resObj.images = [];
        for (let i = 0; i < $images.length; i++) {
            let src = $($images[i]).attr('src');
            // Only adding src which are url not data object of image
            if (src.startsWith("http"))
                resObj.images.push(src);
        }
    }
    return resObj;
}
// Valid url check
utils.stringIsAValidUrl = function (s) {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};
module.exports = utils;