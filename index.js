const fs = require("fs");

const thisYear = new Date().getFullYear();
const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime();
const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime();
const progressOfThisYear =
  (Date.now() - startTimeOfThisYear) /
  (endTimeOfThisYear - startTimeOfThisYear);

const progressBarOfThisYear = generateProgressBar();

let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function generateProgressBar() {
  const progressBarCapacity = 30;
  const passedProgressBarIndex = parseInt(progressOfThisYear * progressBarCapacity);

  return `{ ${Array(progressBarCapacity)
    .fill("▁")
    .map((v, i) => (i < passedProgressBarIndex ? "█" : v))
    .join("")} }`;
}

// Baca README sekarang
let readme = fs.readFileSync("README.md", "utf8");

// Replace bagian Year Progress kalau udah ada
const regex = /⏳ \*\*Year Progress:\*\*.*\n/;

const newProgressLine = `⏳ **Year Progress:** ${progressBarOfThisYear} ${(progressOfThisYear * 100).toFixed(2)}% as on ⏰ ${new Date().getDate()}-${monthNames[new Date().getMonth()]}-${new Date().getFullYear()}\n`;

if (readme.match(regex)) {
  readme = readme.replace(regex, newProgressLine);
} else {
  readme += "\n" + newProgressLine;
}

fs.writeFileSync("README.md", readme);
