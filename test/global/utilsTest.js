let assert = require('chai').assert;
let expect = require('chai').expect;

let utils = require('../../global/utils')

describe('Utils: getHTML checked URL  https://www.amazon.com/dp/B01DO98GQI', function () {
    it('Should return valid HTML', async function () {
        assert.match(await utils.getHTML("https://www.amazon.com/dp/B01DO98GQI"), /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i, 'array contains value');
    })

})
describe('Utils: stringIsAValidUrl checked URL  https://www.amazon.com/dp/B01DO98GQI', function () {
    it('Check URL is valid or not', async function () {
        assert.equal(await utils.stringIsAValidUrl("https://www.amazon.com/dp/B01DO98GQI"), true);
    })
})

describe('Utils: getScrappedObject checked URL https://www.amazon.com/dp/B01DO98GQI', function () {
    it('Check scrapped object is valid or not', async function () {
        let html = await utils.getHTML('https://www.amazon.com/dp/B01DO98GQI');
        // Getting scrapped object and storing in response object
        let responseObj =  await utils.getScrappedObject(html)
      // expect(responseObj.title).toBeDefined();
            expect(responseObj).to.have.all.keys('title','description','images');
    })
})