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


    await page.goto('https://map.naver.com/v5/directions/-/-/-/?c=14167106.3519735,4340132.6845464,11,0,0,0,dh');
    await page.click('#intro_popup_close')

    let data = await getTakeTime('대전 서구', '강남구')

    data = await getTakeTime('청주시외버스터미널', '유성시외버스터미널')
    console.log(data)



    // await browser.close();
})();

async function getTakeTime(from, to) {

    await page.waitFor(5000)
    await page.screenshot({ path: '1.png' });

    // 출발지 입력
    await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input')
    await page.focus('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input')
    await page.click('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input')
    
    await page.type('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input', from)
    // await page.focus('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input')
    // await page.click('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input')
    await page.waitFor(2000)
    await page.screenshot({ path: '2_1.png' });
    await page.waitFor(5000)
    await page.click('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > directions-search-box-instant-search > div > instant-search-list > div > div > nm-list-container:nth-child(2) > div > nm-list > ul > li:nth-child(1) > a')
    // await page.keyboard.press('Enter');
    await page.waitFor(5000)
    await page.screenshot({ path: '2.png' });

    // 도착지 입력
    await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div > directions-search > div.search_box > directions-search-box:nth-child(2) > div > div > div.input_box > input')
    await page.click('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box.item_search.start.droppable > div > div > div.input_box > input')
    
    await page.waitFor(2000)
    await page.keyboard.press('Enter');
    await page.type('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div > directions-search > div.search_box > directions-search-box:nth-child(2) > div > div > div.input_box > input', to, {delay: 200})

    // await page.keyboard.press('Enter');
    await page.waitFor(5000)
    // await page.click('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > directions-search > div.search_box > directions-search-box:nth-child(2) > div > directions-search-box-instant-search > div > instant-search-list > div > div > nm-list-container:nth-child(2) > div > nm-list > ul > li:nth-child(1) > a')
    await page.screenshot({ path: '3.png' });

    // 검색버튼 클릭
    await page.waitForSelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div > directions-search > div.btn_box > button.btn_direction')
    await page.evaluate(() => {
        document.querySelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div > directions-search > div.btn_box > button.btn_direction').click()
    })

    // await page.keyboard.press('Enter');

    await page.waitFor(5000)

    console.log("asf")


    // 대중교통 시간 가져오기
    await page.screenshot({ path: '4.png' });
    // await page.screenshot("test.png")
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

    var publicTransport = publicTransport.replace('시간 ', ':')
    var publicTransport = publicTransport.replace('분', '')

    var car = car.replace('시간 ', ':')
    var car = car.replace('분', '')

    // 대중교통 메뉴 클릭
    await page.evaluate(() => {
        document.querySelector('body > app > layout > div > div.container > div.router-output > shrinkable-layout > directions-layout > directions-result > div.search_area > ul > li:nth-child(1) > a').click()
    })

    return {
        publicTransport,
        car
        // walk
    }
}