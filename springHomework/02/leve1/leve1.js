
const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
puppeteer.launch(
    // {
    //     slowMo:50,
    //     devtools:true
    // }//若不需弹出chorme浏览器则注释代码
).then(async browser => {
    //检查img目录是否存在，如果不存在则创建，后续将爬取的图片存放在img目录中
    try {
        let stat = fs.statSync(path.join(__dirname, 'img'))
    } catch (err) {
        fs.mkdir(path.join(__dirname, 'img'), (err) => {
            if (err) {
                throw err;
            }
        })
    }
    const page = await browser.newPage();
    await page.goto("https://image.baidu.com/"); //从image.baidu.com爬取所需图片
    await page.focus("#kw");
    await page.keyboard.sendCharacter('saber'); //这里选择爬取图片的名字
    await page.click('.s_newBtn');
    page.on('load', async function () {
        const source = await page.evaluate(async () => {
            const images = document.querySelectorAll(".main_img");
            return [...images].map(img => img.src);
        });
        console.log("正在下载资源");
        //把图片写入到文件中
        for (let src of source) {
            let filePath = "";
            //检查图片格式
            if (/jpeg/i.test(src)) {
                filePath = path.join(__dirname, '/img/' + Date.now() + ".jpeg")
            } else if (/jpg/i.test(src)) {
                filePath = path.join(__dirname, '/img/' + Date.now() + ".jpg")
            } else if (/png/i.test(src)) {
                filePath = path.join(__dirname, '/img/' + Date.now() + ".png")
            } else {
                filePath = path.join(__dirname, '/img/' + Date.now())
            }
            request(src).pipe(fs.createWriteStream(filePath))
                .on('finish', () => {
                    console.log("下载完成");
                })
        }
        await browser.close();
    })
});