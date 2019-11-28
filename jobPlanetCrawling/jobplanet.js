const puppeteer = require('puppeteer');
var page

async function getData() {
    var data = await page.evaluate(() => {
        function getData() {

            var list = document.querySelectorAll('#listCompanies > div > div.section_group > section > div > div')
            var result = []

            list.forEach(div => {
                var company = div.querySelector('dl.content_col2_3.cominfo > dt > a').innerText
                var star = div.querySelector('dl.content_col2_4 > dd.gf_row > span').innerText
                var income = div.querySelector('dl.content_col2_4 > dd:nth-child(3) > a > strong').innerText
                var data = {
                    company,
                    star,
                    income
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
    await page.evaluate(() => {
        document.querySelector('#listCompanies > div > div.pg_bottom.um_paginnation > article > a.btn_pgnext').click()
    })
    await page.waitFor(3000)
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('https://www.jobplanet.co.kr/companies?sort_by=review_avg_cache');

    var data_list = []

    while (true) {
        var data = await getData()
        data_list.push(data)
        await nextPage()
        console.log(data)
//      console.log(data_list)
    }
    await browser.close();
})();