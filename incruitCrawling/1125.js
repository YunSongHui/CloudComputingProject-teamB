const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('http://job.incruit.com/entry/searchjob.asp?ct=12&ty=1&cd=1&page=1');
    var data = await page.evaluate(() => {
        function getData() {

            var list = document.querySelectorAll('#content > div:nth-child(10) > div.n_job_list_table_a.list_full_default > table > tbody > tr')
            var result = []

            list.forEach(tr => {
                var company = tr.querySelector('th > div > div.check_list_r > span > a').title
                var title = tr.querySelector('td:nth-child(2) > div > span.accent > a').title
                var field = tr.querySelector('td:nth-child(2) > div > p.details_txts.firstChild > em').textContent //분야
                var careerAcademic = tr.querySelector('td:nth-child(2) > div > p:nth-child(4)>em').textContent.split('|') //경력+학력
                var career = careerAcademic[0]
                var academic = careerAcademic[1]
                var areaWorkingcondition = tr.querySelector('td:nth-child(3) > div > p > em').textContent.split('\n') //위치+근무조건
                var area = areaWorkingcondition[1]
                var workingcondition = areaWorkingcondition[2]
                var deadline = tr.querySelector('td.lasts > div.ddays > p:nth-last-child(1)').textContent

                var data = {
                    company,
                    title,
                    field,
                    career,
                    academic,
                    area,
                    workingcondition,
                    deadline
                }
                result.push(data)
            });
            return result
        }

        return getData()

    })
    console.log(data)

    await browser.close();
})();