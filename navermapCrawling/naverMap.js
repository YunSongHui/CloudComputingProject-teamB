const puppeteer = require('puppeteer');

var page

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    await page.goto('https://map.naver.com/v5/directions/-/14149359.945999566,4511079.071814876,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%86%A1%ED%8C%8C%EA%B5%AC,,/-/transit?c=14141194.1993849,4508485.2393445,12,0,0,0,dh');

    let data = await getTakeTime('대전 서구', '청주 복대동')
    console.log(data)
    // await browser.close();
})();

async function getTakeTime(from, to) {

    await page.waitFor(3000)

    // 출발지 입력
    await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input')
    await page.type('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input', from)
    await page.keyboard.press('Enter');
    await page.waitFor(3000)

    // 도착지 입력
    await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div > directions-search > div.search_box > directions-search-box:nth-child(2) > div > div > div.input_box > input')
    await page.type('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div > directions-search > div.search_box > directions-search-box:nth-child(2) > div > div > div.input_box > input', to)
    await page.keyboard.press('Enter');
    await page.waitFor(3000)

    // 검색버튼 클릭
    await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div > directions-search > div.btn_box > button.btn_direction')
    await page.evaluate(() => {
        document.querySelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div > directions-search > div.btn_box > button.btn_direction').click()
    })

    await page.keyboard.press('Enter');

    // 대중교통 시간 가져오기
    await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.result_area.has_result.ng-star-inserted > div > directions-summary-list > div.list_summary.ng-star-inserted > directions-summary-item-pubtransit.item_summary.selected.ng-star-inserted > div:nth-child(1) > strong')
    var publicTransport = await page.evaluate(() => {
        return document.querySelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.result_area.has_result.ng-star-inserted > div > directions-summary-list > div.list_summary.ng-star-inserted > directions-summary-item-pubtransit.item_summary.selected.ng-star-inserted > div:nth-child(1) > strong').innerText
    })


    // console.log(publicTransport)

    // 자동차 메뉴 클릭
    await page.evaluate(() => {
        document.querySelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > ul > li:nth-child(2) > a').click()
    })

    // 자동차 시간 가져오기
    await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.result_area.has_result.ng-star-inserted > div > directions-summary-list > div.list_summary.ng-star-inserted > directions-summary-item-car.item_summary.selected.ng-star-inserted > div.summary_box > strong')
    var car = await page.evaluate(() => {
        return document.querySelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.result_area.has_result.ng-star-inserted > div > directions-summary-list > div.list_summary.ng-star-inserted > directions-summary-item-car.item_summary.selected.ng-star-inserted > div.summary_box > strong').innerText
    })

    await page.waitFor(3000)

    // // 도보 메뉴 클릭
    // await page.evaluate(() => {
    //     document.querySelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > ul > li:nth-child(3) > a').click()
    // })

    // // 도보 시간 가져오기
    // await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.result_area.has_result.ng-star-inserted > div > directions-summary-list > div.list_summary.ng-star-inserted > directions-summary-item-walking.item_summary.selected.ng-star-inserted > div.summary_box > strong', {
    //     timeout: 10000
    // })
    // let walk = await page.evaluate(() => {
    //     return document.querySelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.result_area.has_result.ng-star-inserted > div > directions-summary-list > div.list_summary.ng-star-inserted > directions-summary-item-walking.item_summary.selected.ng-star-inserted > div.summary_box > strong').innerText
    // })

    var publicTransport=publicTransport.replace('시간 ',':')
    var publicTransport=publicTransport.replace('분','')
    
    var car=car.replace('시간 ',':')
    var car=car.replace('분','')


    return {
        publicTransport,
        car
        // walk
    }
}