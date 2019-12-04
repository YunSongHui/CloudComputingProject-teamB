const puppeteer = require('puppeteer');
var page

async function getData() {
    var data = await page.evaluate(() => {
        function getData() {

            var list = document.querySelectorAll('tab03 > article.artReadStrategy > div > div > div.devStartlist.listArea.specList > div > div.specListWrap > div > ul')
            var result = []

            list.forEach(div => {
                var grade = document.querySelector('li:nth-child(1) > div > span').innerText
                var toeic = document.querySelector('li:nth-child(2) > div > span').innerText
                var toeicSpeaking = document.querySelector('li:nth-child(3) > div > span').innerText
                var opic = document.querySelector('li:nth-child(4) > div > span').innerText
                var language = document.querySelector('li:nth-child(5) > div > span').innerText
                var certificate = document.querySelector('li:nth-child(6) > div > span').innerText
                var oversea = document.querySelector('li:nth-child(7) > div > span').innerText
                var intern = document.querySelector('li:nth-child(8) > div > span').innerText
                var award = document.querySelector('li:nth-child(9) > div > span').innerText
                var volunteer = document.querySelector('li:nth-child(10) > div > span').innerText
    
                var data = {
                    grade,
                    toeic,
                    toeicSpeaking,
                    opic,
                    language,
                    certificate,
                    oversea,
                    intern,
                    award,
                    volunteer
                }
                result.push(data)
            });
            return result
        }
        return getData()
    })
    return data
}

async function nextPage() {
    if (!await page.$('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(1) > a')) return false;
    await page.evaluate(() => {
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(1) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(2) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(3) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(4) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(5) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(6) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(7) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(8) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(9) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > ul > li:nth-child(10) > a').click()
        document.querySelector('#container > div.stContainer > div.starListsWrap.ctTarget > div.tplPagination > p > a').click()
    })
    await page.waitFor(3000)
    return true
}

(async () => {
    const browser = await puppeteer.launch({
        //        headless: false
    });
    page = await browser.newPage();
    await page.goto('http://www.jobkorea.co.kr/starter/spec');

    var data_list = []

    while (true) {
        var data = await getData()
        data_list.push(data)
        console.log(data)
        
        if (!await nextPage()) break;
    }
    await browser.close();
})();