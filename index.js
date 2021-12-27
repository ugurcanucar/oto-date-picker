const puppeteer = require("puppeteer");
const fs = require("fs/promises");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://booking.seventrainingclub.com/#");
  const a = await page.$$(".btn-group label");
  await a[0].click(); //Yarın butonu gelince 1 yap
  const takvim = await page.$(".form-inline button");
  await takvim.click();
  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });
  const info = await page.evaluate(async () => {
    const findLast = async (element) => {
      let reversedArray = Array.from(element).reverse();
      let choosedElement = reversedArray.find((x) => {
        if (x.children.length > 0) {
          if (x.children[1].classList.contains("danger") === false) {
            return x.children[1];
          }
        }
      });

      return choosedElement.children[1].firstElementChild;
    };
    let table = document.querySelectorAll(".col-lg-7 .table tbody tr");

    const radioBtn = await findLast(table);
    radioBtn.click();
    const input = document.querySelector(
      ".form-inline .form-group .form-group input"
    );
    input.value = "5303640441";
    document.querySelector(".form-inline .form-group button").click();
  });
})();
// let table = document.querySelector(".col-lg-7 .table tbody");
// let lastTR = table.lastElementChild;
// if (lastTR.lastElementChild.classList.contains("danger")) {
//   lastTR.previousSibling.lastElementChild.querySelector("input").click();
// }
