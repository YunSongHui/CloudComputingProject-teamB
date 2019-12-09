const puppeteer = require('puppeteer');
const { insertJobkoreaSuccess } = require('../DatabaseConnector')
let curPage = 1

var page
var subpage

async function getSpecData(link) {
    await subpage.goto(link)
    var data = await subpage.evaluate(() => {

        const opic_grade = {null:0,'NL':1,'NM':2,'NH':3,'IL':4,'IM1':5,'IM2':6,'IM3':7,'IH':8,'AL':9}

        function getAttributeText(parent, selector, attr) {
            let el = parent.querySelector(selector)
            if (el) return el[attr].replace('Lv','')
            return null
        }

        function getData() {

            var list = document.querySelectorAll('#container > div.stContainer > div.specViewWrap > div.specAtc.myTotalAtc > div.averageSpecWrap > div.averageSpec.allContent > div.specListWrap > div > ul')
            var result = []

            list.forEach(ul => {
                var company = document.querySelector('#devPassSpecForm > div > h2 > strong > a').innerText
                var grade = getAttributeText(ul,'li:nth-child(1) > div > span > em','innerText')
                var toeic = getAttributeText(ul,'li:nth-child(2) > div > span > em','innerText')
                var toeicSpeaking = getAttributeText(ul,'li:nth-child(3) > div > span > em','innerText')
                var opic = opic_grade[getAttributeText(ul,'li:nth-child(4) > div > span > em','innerText')]
                var language = getAttributeText(ul,'li:nth-child(5) > div > span > em','innerText')
                var certificate = getAttributeText(ul,'li:nth-child(6) > div > span > em','innerText')
                var oversea = getAttributeText(ul,'li:nth-child(7) > div > span > em','innerText')
                var intern = getAttributeText(ul,'li:nth-child(8) > div > span > em','innerText')
                var award = getAttributeText(ul,'li:nth-child(9) > div > span > em','innerText')
                var volunteer = getAttributeText(ul,'li:nth-child(10) > div > span > em','innerText')

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
        await insertJobkoreaSuccess(spec)
        console.log(spec)
    }

    await nextPage()
}

(async () => {

    var data_list = []

    const browser = await puppeteer.launch({
        // headless: false
    });
    page = await browser.newPage();
    subpage = await browser.newPage();
    await page.goto('http://www.jobkorea.co.kr/starter/spec');
    await nextPage()
//    setInterval(nextPage, 2000)
    await browser.close();

})()