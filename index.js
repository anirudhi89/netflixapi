const puppeteer = require('puppeteer');

async function getMovies() {
    const browser = await puppeteer.launch({
        // headless: false,
        // defaultViewport: null
    })

    const page = await browser.newPage();
    var url = `https://www.justwatch.com/us/provider/netflix/movies`
    await page.goto(url);

    await autoScroll(page)
    // class="custom-infinite-scroll custom-infinite-scroll--hidden-spinner"

    const text = await page.evaluate(() => Array.from(document.querySelectorAll('[class="picture-comp title-poster__image"]'), element => element.children[2].getAttribute('src')));

    console.log(text)
    browser.close();
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


getMovies()