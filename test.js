const axios = require("axios");
const cheerio = require("cheerio");

async function fetchExams() {
  const url = "https://timetoexams.com/";
  
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const exams = [];

    $(".exam").each((i, elem) => {
      const subject = $(elem).find(".subject").text().trim();
      const paper = $(elem).find(".paper").text().trim();
      const countdown = $(elem).find(".countdown").text().trim();

      exams.push({ subject, paper, countdown });
    });

    return exams;
  } catch (err) {
    console.error("Error fetching exams:", err.message);
    return [];
  }
}

// Example use
fetchExams().then(exams => {
  console.table(exams);
});
