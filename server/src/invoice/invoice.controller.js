const router = require("express").Router();
const puppeteer = require("puppeteer");
router.get("/", async (req, res, next) => {
  try {
    const targetUrl = `http://localhost:3000/invoice`; // URL halaman Next.js

    const browser = await puppeteer.launch({
      headless: true, // gunakan true jika error
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // penting untuk server
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="document.pdf"',
      "Content-Length": pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

module.exports = router;
