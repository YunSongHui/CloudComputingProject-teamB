const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://www.jobkorea.co.kr/Starter/?JoinPossible_Stat=0&schOrderBy=0&LinkGubun=0&LinkNo=0&schType=0&schGid=0&Page=1');
    var data = await page.evaluate(() => {
        function getData() {
            var company = document.querySelector('#devStarterForm > div.filterListArea > ul > li > div.co > div.coTit > a').text
            var title = document.querySelector('#devStarterForm > div.filterListArea > ul > li:nth-child(1) > div.info > div.tit > a > span').textContent
            while()
            var field1 = document.querySelectorAll('#devStarterForm > div.filterListArea > ul > li:nth-child(1) > div.info > div.sTit > span')[0].textContent
            var field2 = document.querySelectorAll('#devStarterForm > div.filterListArea > ul > li:nth-child(1) > div.info > div.sTit > span')[1].textContent
            var field3 = document.querySelectorAll('#devStarterForm > div.filterListArea > ul > li:nth-child(1) > div.info > div.sTit > span')[2].textContent
            var career = document.querySelector('#devStarterForm > div.filterListArea > ul > li > div.sDesc > strong').textContent
            var educate = document.querySelector('#devStarterForm > div.filterListArea > ul > li > div.sDesc > span').textContent
            var location = document.querySelector('#devStarterForm > div.filterListArea > ul > li:nth-child(1) > div.sDesc > span:nth-child(3)').textContent
            var duedate = document.querySelector('#devStarterForm > div.filterListArea > ul > li > div.side > span.day').textContent
            return { company, title, field1, field2, field3, career, educate, location, duedate }
        }

        return getData()

    })
    console.log(data)


    await browser.close();
})();