const puppeteer = require('puppeteer');
var page

async function getData() {
    var data = await page.evaluate(() => {

        function getAttributeText(parent, selector, attr) {
            let el = parent.querySelector(selector)
            if (el) return el[attr]
            return ''
        }

        function getData() {


            var list = document.querySelectorAll('#content > div:not(.entry-new2017) > div.n_job_list_table_a.list_full_default> table > tbody > tr')
            var result = []

            list.forEach(tr => {

                try {
                    var company = getAttributeText(tr, 'th > div > div.check_list_r > span > a', 'title')
                    var title = getAttributeText(tr, 'td:nth-child(2) > div > span.accent > a', 'title')
                    var field = getAttributeText(tr, 'td:nth-child(2) > div > p.details_txts.firstChild > em', 'textContent') //분야
                    var careerAcademic = getAttributeText(tr, 'td:nth-child(2) > div > p:nth-child(4)>em', 'textContent').split('|') //경력+학력
                    var career = careerAcademic[0]
                    var academic = careerAcademic[1]
                    var areaWorkingcondition = getAttributeText(tr, 'td:nth-child(3) > div > p > em', 'textContent').split('\n') //위치+근무조건
                    var area = areaWorkingcondition[1]
                    var workingcondition = areaWorkingcondition[2]
                    var deadline = getAttributeText(tr, 'td.lasts > div.ddays > p:nth-last-child(1)', 'textContent')

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
                } catch (error) {
                    console.log(error)
                    console.log(tr)
                }
            });

            return result
        }

        return getData()

    })
    return data
}

async function nextPage() {
    if (!await page.$('#content > p > a.next_n')) return false;
    await page.evaluate(() => {
        document.querySelector('#content > p > a.next_n').click()
    })
    await page.waitFor(5000)
    return true

}

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('http://job.incruit.com/entry/searchjob.asp?ct=12&ty=1&cd=1&group1=3&articlecount=60');

    var data_list = []

    while (true) {
        var data = await getData()
        data_list.push(data)
        console.log(data)
        if (!await nextPage()) break;
        // console.log(data_list)
    }
    await browser.close();
})();