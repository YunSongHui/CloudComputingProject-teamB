const puppeteer = require('puppeteer');
const { getAll, setTransferTime } = require('../DatabaseConnector')

var page

(async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });

    let Recruitment = await getAll()

    // console.log(Recruitment)

    for (const item of Recruitment) {
        // console.log(item.area)
        let data = await getTakeTime('강남구', item.area)
        await setTransferTime(item.id, { car: data.car, publicTransport: data.public })
        console.log(data)
    }

    await browser.close();
})();

async function getTakeTime(from, to) {
    await page.goto('https://map.kakao.com/');
    await page.waitFor(2000)
    await page.waitForSelector('.carRoute.carRoute-INACTIVE')
    await page.evaluate(() => {
        document.querySelector('.carRoute.carRoute-INACTIVE').click()
    })

    await page.waitForSelector('div.WaypointBoxView.origin > div.waypointWindow > form > input')
    await page.type('div.WaypointBoxView.origin > div.waypointWindow > form > input', from)
    await page.waitFor(1000)
    await page.keyboard.press('Enter');


    await page.waitFor(1000)

    await page.waitForSelector('div.WaypointBoxView.dest > div.waypointWindow > form > input')
    await page.evaluate(() => { document.querySelector('div.WaypointBoxView.dest > div.waypointWindow > form > input').click() })
    await page.type('div.WaypointBoxView.dest > div.waypointWindow > input', to)
    await page.type('div.WaypointBoxView.dest > div.waypointWindow > form > input', to)
    await page.evaluate((to) => { document.querySelector('div.WaypointBoxView.dest > div.waypointWindow > input').value = to }, to)
    await page.keyboard.press('Enter');

    await page.waitFor(1000)

    await page.click('#cartab')
    await page.click('#cartab')

    await page.waitForSelector('div.CarRouteResultView > ul > li > div.summary > div > div.contents > p > span.time')
    var car = await page.evaluate(() => { return document.querySelector('div.CarRouteResultView > ul > li > div.summary > div > div.contents > p > span.time').textContent })

    await page.click('#transittab')
    await page.click('#transittab')

    await page.waitForSelector('div.TransitRouteResultView > ul > li.TransitRouteItem > div.title.clickArea > span.time')

    let public = await page.evaluate(() => {
        if (document.querySelector('.walkTime')) { document.querySelector('.walkTime').remove() };
        return document.querySelector('div.TransitRouteResultView > ul > li.TransitRouteItem > div.title.clickArea > span.time').textContent
    })

    car = car.replace('시간', ':')
    car = car.replace(/분| /g, '')
    if(!car.includes(":")) car = "00:"+car
    car += ":00"

    public = public.replace('시간', ':')
    public = public.replace(/분| /g, '') 
    if(!public.includes(":")) public = "00:"+public
    public += ":00"

    return {
        from, to,
        car, public
    }
}

