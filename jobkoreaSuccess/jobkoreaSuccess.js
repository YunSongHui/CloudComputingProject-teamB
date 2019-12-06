const puppeteer = require('puppeteer');

let curPage = 1

var page
var subpage

async function getSpecData(link) {
    await subpage.goto(link)
    var data = await subpage.evaluate(() => {
        function getData() {

            var list = document.querySelectorAll('#container > div.stContainer > div.specViewWrap > div.specAtc.myTotalAtc > div.averageSpecWrap > div.averageSpec.allContent > div.specListWrap > div > ul')
            var result = []

            list.forEach(ul => {
                var company=document.querySelector('#devPassSpecForm > div > h2 > strong > a').innerText
                var grade = ul.querySelector('li:nth-child(1) > div > span').innerText
                var toeic = ul.querySelector('li:nth-child(2) > div > span').innerText
                var toeicSpeaking = ul.querySelector('li:nth-child(3) > div > span').innerText
                var opic = ul.querySelector('li:nth-child(4) > div > span').innerText
                var language = ul.querySelector('li:nth-child(5) > div > span').innerText
                var certificate = ul.querySelector('li:nth-child(6) > div > span').innerText
                var oversea = ul.querySelector('li:nth-child(7) > div > span').innerText
                var intern = ul.querySelector('li:nth-child(8) > div > span').innerText
                var award = ul.querySelector('li:nth-child(9) > div > span').innerText
                var volunteer = ul.querySelector('li:nth-child(10) > div > span').innerText

                var data = {
                    company,
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
    await page.goto(`http://www.jobkorea.co.kr/starter/spec?IsFavorOn=0&IsAlumniOn=0&Page=${curPage}`)
    await page.waitFor(3000)
    curPage++

    var link_list = await page.evaluate(() => {
        function getData() {

            var list = document.querySelectorAll('#container > div.stContainer > div.starListsWrap.ctTarget > div.specListArea > ul > li > div.coWrap > dl > dt > a.tit')
            var result = []

            list.forEach(a => {
                var link = a.href
                result.push(link)
            });
            return result
        }
        return getData()
    })

    console.log(link_list)

    for (const link of link_list) {
        let spec = await getSpecData(link)
        console.log(spec)
    }

    await nextPage()
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    subpage = await browser.newPage();
    await page.goto('http://www.jobkorea.co.kr/starter/spec');
    await nextPage()
    // setInterval(nextPage, 2000)
})()